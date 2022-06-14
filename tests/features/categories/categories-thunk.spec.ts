import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import thunk from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { BASE_API_URL } from '@src/common/constants';
import { getCategories } from '@features/categories/categoriesSlice';
import { normalize } from 'normalizr';
import { CategoriesSchema } from '@common/normalizeSchemas';
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
});
