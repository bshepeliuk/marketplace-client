import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import thunk from 'redux-thunk';
import { getFilterOptionsByCategoryId } from '@src/features/filters/filtersSlice';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import { rootStateMock } from '../../mocks/stateMock';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('FILTER THUNKS', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore(rootStateMock);
  });

  it('should return min & max prices and filter options by categoryId', async () => {
    const filtersResponse = {
      prices: { min: 1, max: 8 },
      options: [{ id: 1, title: 'RAM', description: '64 GB' }],
    };

    server.use(
      rest.get(`${BASE_API_URL}/filters/:categoryId`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(filtersResponse));
      }),
    );

    await store.dispatch(getFilterOptionsByCategoryId({ categoryId: 1 }));

    const actualActions = store.getActions();

    const expectedActions = [
      {
        type: getFilterOptionsByCategoryId.pending.type,
        payload: undefined,
      },
      {
        type: getFilterOptionsByCategoryId.fulfilled.type,
        payload: {
          prices: filtersResponse.prices,
          options: filtersResponse.options,
        },
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  it('should return error when something went wrong.', async () => {
    const filtersErrorResponse = {
      message: 'Cannot get options and prices by current Id',
    };

    server.use(
      rest.get(`${BASE_API_URL}/filters/:categoryId`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(filtersErrorResponse));
      }),
    );

    await store.dispatch(getFilterOptionsByCategoryId({ categoryId: 999 }));

    const actualActions = store.getActions();
    const expectedActions = [
      {
        type: getFilterOptionsByCategoryId.pending.type,
        payload: undefined,
      },
      {
        type: getFilterOptionsByCategoryId.rejected.type,
        payload: {
          message: filtersErrorResponse.message,
        },
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });
});
