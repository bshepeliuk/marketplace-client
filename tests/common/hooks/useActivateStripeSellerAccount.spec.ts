/* eslint-disable max-len */
import { renderHook, act } from '@testing-library/react-hooks';
import useActivateStripeSellerAccount from '@common/hooks/useActivateStripeSellerAccount';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';

const server = setupServer();

describe('useActivateStripeSellerAccount', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('when activate function was called: isProcessing should be true, hasError should be false', () => {
    server.use(
      rest.post(`${BASE_API_URL}/onboard-user`, (req, res, ctx) => {
        return res(
          ctx.json({ accountLink: 'https://some-stripe.account-link.com' }),
        );
      }),
    );

    const { result } = renderHook(() => {
      return useActivateStripeSellerAccount();
    });

    act(() => {
      result.current.activate();
    });

    expect(result.current.isProcessing).toBeTruthy();
    expect(result.current.hasError).toBeFalsy();
  });

  test('hasError should be true when something went wrong!', async () => {
    server.use(
      rest.post(`${BASE_API_URL}/onboard-user`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Something went wrong!' }),
        );
      }),
    );

    const { result, waitForNextUpdate } = renderHook(() => {
      return useActivateStripeSellerAccount();
    });

    act(() => {
      result.current.activate();
    });

    await waitForNextUpdate();

    expect(result.current.isProcessing).toBeFalsy();
    expect(result.current.hasError).toBeTruthy();
  });
});
