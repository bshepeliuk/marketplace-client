/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BrandSelect from '@src/features/addNewDevice/components/BrandForm/BrandSelect';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
import selectEvent from 'react-select-event';
import { Wrapper } from '../../../../wrapper';
import { newDeviceContextValuesMock } from '../../../../mocks/data';

const mockStore = configureMockStore([thunk]);

const defaultBrands = [
  {
    id: 1,
    name: 'laptops',
  },
  {
    id: 2,
    name: 'tablets',
  },
];

const formikPropsMock = {
  initialValues: { name: '' },
  onSubmit: jest.fn(),
  setFieldValue: jest.fn(),
  resetForm: jest.fn(),
} as any;

const storeMock = mockStore({
  devices: { isCreating: false, items: [] },
  brands: {
    isCreating: false,
    items: defaultBrands,
  },
});

const renderBrandSelect = () => {
  return render(
    <Provider store={storeMock}>
      <NewDeviceProvider>
        <MemoryRouter>
          <BrandSelect formik={formikPropsMock} />
        </MemoryRouter>
      </NewDeviceProvider>
    </Provider>,
  );
};

describe('[COMPONENTS]: BrandSelect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should change select input value', async () => {
    const { getByTestId } = renderBrandSelect();

    const brandSelectInput = getByTestId('brand-select') as HTMLInputElement;

    const value = 'SOME_NEW_SELECTED_BRAND';

    fireEvent.change(brandSelectInput, {
      target: { value: 'SOME_NEW_SELECTED_BRAND' },
    });

    expect(brandSelectInput).toBeInTheDocument();
    expect(brandSelectInput.value).toBe(value);
  });

  test('should have menu with default brands.', async () => {
    const { getByText } = renderBrandSelect();

    const select = getByText('Please select or create device brand.');

    await selectEvent.openMenu(select);

    for (const item of defaultBrands) {
      expect(getByText(item.name)).toBeInTheDocument();
    }
  });

  test('should clear selected brand', async () => {
    const { getByText, queryByText } = renderBrandSelect();

    const select = getByText('Please select or create device brand.');

    await selectEvent.select(select, 'laptops');

    expect(getByText(/laptops/i)).toBeInTheDocument();

    await selectEvent.clearAll(getByText(/laptops/i));

    expect(formikPropsMock.setFieldValue).toBeCalledWith('name', 'laptops');
    expect(formikPropsMock.resetForm).toBeCalledTimes(1);
    expect(queryByText(/laptops/i)).toBeNull();
  });

  test('should set brand on mount in case brand was selected previously.', () => {
    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            brand: { id: 1, name: 'SELECTED_BRAND' },
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <BrandSelect formik={formikPropsMock} />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/SELECTED_BRAND/i)).toBeInTheDocument();
  });
});
