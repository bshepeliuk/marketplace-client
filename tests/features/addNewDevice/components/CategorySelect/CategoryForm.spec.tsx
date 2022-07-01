/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
// eslint-disable-next-line max-len
import CategoryFormView from '@features/addNewDevice/components/CategoryForm/CategoryFormView';
import { normalize } from 'normalizr';
import { CategoriesSchema } from '@src/common/normalizeSchemas';
import selectEvent from 'react-select-event';
import { Wrapper } from '../../../../wrapper';
import { categories, newDeviceContextValuesMock } from '../../../../mocks/data';

const { result, entities } = normalize(categories, CategoriesSchema);

const state = {
  entities: {
    categories: {},
  },
  devices: { isCreating: false, items: [] },
  categories: {
    isCreating: false,
    items: [],
  },
};

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('[COMPONENTS]: CategoryForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('next button should be disabled by default', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <CategoryFormView />
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

  test('should have prev link.', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <CategoryFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const link = getByText(/prev/i) as HTMLLinkElement;

    expect(link.getAttribute('href')).toBe('/new');
  });

  test('next button should be available when category was selected.', async () => {
    const updatedState = {
      ...state,
      entities: {
        categories: entities.categories,
      },
      categories: {
        items: result,
      },
    };

    const { getByText } = render(
      <NewDeviceProvider>
        <CategoryFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={updatedState} />;
        },
      },
    );

    const select = getByText('Please select or create device category.');

    await selectEvent.select(select, 'tablets');

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(NextBtn.disabled).toBeFalsy();
  });

  test('next button should save category and navigate to another page', async () => {
    const updatedState = {
      ...state,
      entities: {
        categories: entities.categories,
      },
      categories: {
        items: result,
      },
    };

    const { getByText } = render(
      <NewDeviceProvider>
        <CategoryFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={updatedState} />;
        },
      },
    );

    const select = getByText('Please select or create device category.');

    await selectEvent.select(select, 'tablets');

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    fireEvent.click(NextBtn);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('/new/device-base-info');
    });
  });

  test('category should be added to context state.', async () => {
    const updatedState = {
      ...state,
      entities: {
        categories: entities.categories,
      },
      categories: {
        items: result,
      },
    };

    const addCategoryMock = jest.fn();

    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addCategory: addCategoryMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <CategoryFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={updatedState} />;
        },
      },
    );

    const select = getByText('Please select or create device category.');

    await selectEvent.select(select, 'tablets');

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    fireEvent.click(NextBtn);

    await waitFor(() => {
      expect(addCategoryMock).toBeCalledWith({
        category: {
          createdAt: '2021-05-29T06:14:42.024Z',
          id: 2,
          name: 'tablets',
          updatedAt: '2021-05-29T06:14:42.024Z',
        },
      });
    });
  });
});
