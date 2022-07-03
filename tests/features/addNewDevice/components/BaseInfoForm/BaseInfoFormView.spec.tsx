/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
// eslint-disable-next-line max-len
import BaseInfoFormView from '@features/addNewDevice/components/BaseInfoForm/BaseInfoFormView';
import { Wrapper } from '../../../../wrapper';
import { newDeviceContextValuesMock } from '../../../../mocks/data';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('[COMPONENTS]: BaseInfoFormView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render base info form', async () => {
    const { getByText, getByLabelText } = render(
      <NewDeviceProvider>
        <BaseInfoFormView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    const titleInput = getByLabelText(/name/i);
    const priceInput = getByLabelText(/price/i);
    const quantityInput = getByLabelText(/quantity/i);

    const link = getByText(/prev/i) as HTMLLinkElement;
    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(titleInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();

    expect(link.getAttribute('href')).toBe('/new/device-category');
    expect(NextBtn.disabled).toBeTruthy();
  });

  test('should change initials values', async () => {
    const baseInfo = {
      name: 'HP Pavillion 17',
      quantity: '1',
      price: '25000',
    };

    const { getByText, getByLabelText, getByDisplayValue } = render(
      <NewDeviceProvider>
        <BaseInfoFormView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    const titleInput = getByLabelText(/name/i);
    const priceInput = getByLabelText(/price/i);
    const quantityInput = getByLabelText(/quantity/i);

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(NextBtn.disabled).toBeTruthy();

    fireEvent.change(titleInput, { target: { value: baseInfo.name } });
    fireEvent.change(priceInput, { target: { value: baseInfo.price } });
    fireEvent.change(quantityInput, { target: { value: baseInfo.quantity } });

    expect(getByDisplayValue(baseInfo.name)).toBeInTheDocument();
    expect(getByDisplayValue(baseInfo.price)).toBeInTheDocument();
    expect(getByDisplayValue(baseInfo.quantity)).toBeInTheDocument();

    await waitFor(() => {
      expect(NextBtn.disabled).toBeFalsy();
    });
  });

  test('should render with info from state.', async () => {
    const baseInfo = {
      name: 'HP Pavillion 17',
      quantity: '1',
      price: '25000',
    };

    const { getByDisplayValue } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            info: baseInfo,
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <BaseInfoFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => {
      expect(getByDisplayValue(baseInfo.name)).toBeInTheDocument();
      expect(getByDisplayValue(baseInfo.price)).toBeInTheDocument();
      expect(getByDisplayValue(baseInfo.quantity)).toBeInTheDocument();
    });
  });

  test('should submit form successfully', async () => {
    const addBaseInfoMock = jest.fn();

    const baseInfo = {
      name: 'HP Pavillion 17',
      quantity: '1',
      price: '25000',
    };

    const { getByText, getByLabelText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addBaseInfo: addBaseInfoMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <BaseInfoFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const titleInput = getByLabelText(/name/i);
    const priceInput = getByLabelText(/price/i);
    const quantityInput = getByLabelText(/quantity/i);

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    fireEvent.change(titleInput, { target: { value: baseInfo.name } });
    fireEvent.change(priceInput, { target: { value: baseInfo.price } });
    fireEvent.change(quantityInput, { target: { value: baseInfo.quantity } });

    fireEvent.click(NextBtn);

    await waitFor(() => {
      expect(NextBtn.disabled).toBeFalsy();
      expect(addBaseInfoMock).toBeCalledWith(baseInfo);
      expect(mockedNavigate).toBeCalledWith('/new/device-features');
    });
  });
});
