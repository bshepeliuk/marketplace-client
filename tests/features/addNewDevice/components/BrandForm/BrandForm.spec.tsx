/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
// eslint-disable-next-line max-len
import BrandFormView from '@features/addNewDevice/components/BrandForm/BrandFormView';
import selectEvent from 'react-select-event';
import { Wrapper } from '../../../../wrapper';
import { brands, newDeviceContextValuesMock } from '../../../../mocks/data';

const state = {
  devices: { isCreating: false, items: [] },
  brands: {
    isCreating: false,
    items: [],
  },
};

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('[COMPONENTS]: BrandForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('next button should be disabled by default', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <BrandFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(NextBtn.disabled).toBeTruthy();
  });
  // eslint-disable-next-line max-len
  test('next button should be available when brands was selected. Also should navigate to next page.', async () => {
    const updatedState = {
      ...state,
      brands: {
        items: brands,
      },
    };

    const { getByText } = render(
      <NewDeviceProvider>
        <BrandFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={updatedState} />;
        },
      },
    );

    const select = getByText('Please select or create device brand.');

    await selectEvent.select(select, 'ASUS');

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(NextBtn.disabled).toBeFalsy();

    fireEvent.click(NextBtn);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('/new/device-category');
    });
  });

  test('brand should be added to context state.', async () => {
    const updatedState = {
      ...state,
      brands: {
        items: brands,
      },
    };

    const addBrandMock = jest.fn();

    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addBrand: addBrandMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <BrandFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={updatedState} />;
        },
      },
    );

    const select = getByText('Please select or create device brand.');

    await selectEvent.select(select, 'ASUS');

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    fireEvent.click(NextBtn);

    await waitFor(() => {
      expect(addBrandMock).toBeCalledWith({
        brand: {
          id: 1,
          name: 'ASUS',
          createdAt: '2021-07-20T16:25:34.061Z',
          updatedAt: '2021-07-20T16:25:34.061Z',
        },
      });
    });
  });
});
