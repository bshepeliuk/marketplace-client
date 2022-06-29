import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import thunk from 'redux-thunk';
import { BASE_API_URL } from '@src/common/constants';
import { getBrands } from '@src/features/brands/brandsSlice';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import { brands } from '../../mocks/data';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: brands.', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({});
  });

  test('should return brands successfully.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/brands`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ brands }));
      }),
    );

    await store.dispatch(getBrands({ name: undefined }));

    const actualActions = store.getActions();
    const expectedActions = [
      { type: getBrands.pending.type, payload: undefined },
      {
        type: getBrands.fulfilled.type,
        payload: { brands },
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  test('should return error from API.', async () => {
    const errorResponse = {
      message: '[Brands API]: Something went wrong!',
    };

    server.use(
      rest.get(`${BASE_API_URL}/brands`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(errorResponse));
      }),
    );

    await store.dispatch(getBrands({ name: undefined }));

    const actualActions = store.getActions();
    const expectedActions = [
      { type: getBrands.pending.type, payload: undefined },
      {
        type: getBrands.rejected.type,
        payload: errorResponse,
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });
});
