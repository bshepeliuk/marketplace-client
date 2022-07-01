/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line max-len
import CategorySelect from '@features/addNewDevice/components/CategoryForm/CategorySelect';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
import { normalize } from 'normalizr';
import { CategoriesSchema } from '@src/common/normalizeSchemas';
import selectEvent from 'react-select-event';
import { Wrapper } from '../../../../wrapper';
import { categories, newDeviceContextValuesMock } from '../../../../mocks/data';

const formikPropsMock = {
  initialValues: { name: '' },
  onSubmit: jest.fn(),
  setFieldValue: jest.fn(),
  resetForm: jest.fn(),
} as any;

const { result, entities } = normalize(categories, CategoriesSchema);

const state = {
  entities: {
    categories: entities.categories,
  },
  devices: { isCreating: false, items: [] },
  categories: {
    isCreating: false,
    items: result,
  },
};

describe('[COMPONENTS]: CategorySelect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have options from state', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <CategorySelect formik={formikPropsMock} />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const select = getByText('Please select or create device category.');

    await selectEvent.openMenu(select);

    for (const item of categories) {
      expect(getByText(item.name)).toBeInTheDocument();
    }
  });

  test('should clear selected brand', async () => {
    const { getByText, queryByText } = render(
      <NewDeviceProvider>
        <CategorySelect formik={formikPropsMock} />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const select = getByText('Please select or create device category.');

    await selectEvent.select(select, 'tablets');

    expect(getByText(/tablets/i)).toBeInTheDocument();

    await selectEvent.clearAll(getByText(/tablets/i));

    expect(formikPropsMock.setFieldValue).toBeCalledWith('name', 'tablets');
    expect(queryByText(/tablets/i)).toBeNull();
  });

  test('should set category on mount in case category was selected previously.', () => {
    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            category: { id: 1, name: 'SOME_CATEGORY' },
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <CategorySelect formik={formikPropsMock} />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/SOME_CATEGORY/i)).toBeInTheDocument();
  });
});
