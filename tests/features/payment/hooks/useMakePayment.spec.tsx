/* eslint-disable max-len */
import React from 'react';
import * as ReactRedux from 'react-redux';
import { waitFor } from '@testing-library/dom';
import { renderHook, act } from '@testing-library/react-hooks';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import { Wrapper } from '../../../wrapper';
import { goods } from '../../../mocks/data';
import {
  mockStripe,
  mockStripeElement,
  mockStripeElements,
} from '../../../mocks/stripe';

const server = setupServer(
  rest.post(`${BASE_API_URL}/create-checkout-session`, (req, res, ctx) => {
    return res(ctx.json({ sessionId: 2222 }));
  }),
);

const mockRedirectToCheckout = jest.fn();

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  Element: () => mockStripeElement(),
  useStripe: () => ({
    ...mockStripe(),
    redirectToCheckout: mockRedirectToCheckout,
  }),
  useElements: () => mockStripeElements(),
}));

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    useLocation: jest.fn().mockImplementation(() => ({
      pathname: '/cart',
    })),
  };
});

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('useMakePayment hook', () => {
  const dispatch = jest.fn();

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('stripe.redirectToCheckout should be called', async () => {
    const { result } = renderHook(() => useMakePayment(goods), {
      wrapper: (props) => (
        <Wrapper
          {...(props as object)}
          state={{
            auth: {
              isLoggedIn: true,
              user: { id: 1, fullName: 'Tony Stark', email: 'tony@stark.io' },
            },
          }}
        />
      ),
    });

    act(() => {
      result.current.pay();
    });

    await waitFor(() => {
      expect(mockRedirectToCheckout).toBeCalledTimes(1);
      expect(result.current.isPending).toBeTruthy();
    });
  });

  test('be default isPending should be false', () => {
    const { result } = renderHook(() => useMakePayment(goods), {
      wrapper: Wrapper,
    });

    expect(result.current.isPending).toBeFalsy();
  });

  test('isPending flag should be true when authorized user tries to pay for goods.', async () => {
    const { result } = renderHook(() => useMakePayment(goods), {
      wrapper: (props) => (
        <Wrapper
          {...(props as object)}
          state={{
            auth: {
              isLoggedIn: true,
              user: { id: 1, fullName: 'Tony Stark', email: 'tony@stark.io' },
            },
          }}
        />
      ),
    });

    act(() => {
      result.current.pay();
    });

    expect(result.current.isPending).toBeTruthy();

    await waitFor(() => {
      expect(mockRedirectToCheckout).toBeCalledWith({ sessionId: 2222 });
    });
  });

  test('should navigate to login page when unauthorized user tries to pay for goods.', () => {
    const { result } = renderHook(() => useMakePayment(goods), {
      wrapper: (props) => (
        <Wrapper
          {...(props as object)}
          state={{ auth: { isLoggedIn: false } }}
        />
      ),
    });

    act(() => {
      result.current.pay();
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/auth/login', {
      state: { from: '/cart' },
    });
    expect(result.current.isPending).toBeFalsy();
  });

  test('should changed isPending to default value when server return some error.', async () => {
    server.use(
      rest.post(`${BASE_API_URL}/create-checkout-session`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: '[Stripe]: Something went wrong!' }),
        );
      }),
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useMakePayment(goods),
      {
        wrapper: (props) => (
          <Wrapper
            {...(props as object)}
            state={{ auth: { isLoggedIn: true, user: { id: 1 } } }}
          />
        ),
      },
    );

    act(() => {
      result.current.pay();
    });

    await waitForNextUpdate();

    expect(result.current.isPending).toBeFalsy();
  });
});
