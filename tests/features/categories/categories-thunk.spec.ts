import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import thunk from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { BASE_API_URL } from '@src/common/constants';
import {
  addCategory,
  getCategories,
} from '@features/categories/categoriesSlice';
import { normalize } from 'normalizr';
import { CategoriesSchema, CategorySchema } from '@common/normalizeSchemas';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import { categories } from '../../mocks/data';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: categories.', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({
      categories: {
        isLoading: false,
      },
    });
  });

  test('should return categories successfully.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ types: categories }));
      }),
    );

    const { result, entities } = normalize(categories, CategoriesSchema);

    await store.dispatch(getCategories());

    const actualActions = store.getActions();
    const expectedActions = [
      { type: getCategories.pending.type, payload: undefined },
      {
        type: getCategories.fulfilled.type,
        payload: { result, entities },
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  test('should return error from API.', async () => {
    const errorResponse = {
      message: '[Categories API]: Something went wrong!',
    };

    server.use(
      rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorResponse));
      }),
    );

    await store.dispatch(getCategories());

    const actualActions = store.getActions();
    const expectedActions = [
      { type: getCategories.pending.type, payload: undefined },
      {
        type: getCategories.rejected.type,
        payload: errorResponse,
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  test('should not fetch a new categories when isLoading is true.', async () => {
    store = mockStore({
      categories: {
        isLoading: true,
      },
    });

    server.use(
      rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ types: categories }));
      }),
    );

    await store.dispatch(getCategories());

    const actualActions = store.getActions();
    const expectedActions = [] as AnyAction[];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  test('should add a new category successfully', async () => {
    const newCategory = {
      id: 5,
      name: 'NEW_CATEGORY',
    };

    server.use(
      rest.post(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            type: newCategory,
          }),
        );
      }),
    );

    const { result, entities } = normalize(newCategory, CategorySchema);

    await store.dispatch(addCategory({ name: 'NEW_CATEGORY' }));

    const actualActions = store.getActions();
    const expectedActions = [
      { type: addCategory.pending.type, payload: undefined },
      {
        type: addCategory.fulfilled.type,
        payload: {
          result,
          entities,
        },
      },
    ] as AnyAction[];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  test('should return error when device was not added.', async () => {
    const error = {
      message: '[NEW DEVICE]: something went wrong!',
    };

    server.use(
      rest.post(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: error.message,
          }),
        );
      }),
    );

    await store.dispatch(addCategory({ name: 'NEW_CATEGORY' }));

    const actualActions = store.getActions();
    const expectedActions = [
      { type: addCategory.pending.type, payload: undefined },
      {
        type: addCategory.rejected.type,
        payload: {
          message: error.message,
        },
      },
    ] as AnyAction[];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });
});
