import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';

import { BASE_API_URL } from '@src/common/constants';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import { getPurchases } from '@src/features/purchases/purchasesSlice';
import { purchasesGetResponse } from '../../mocks/api/responses';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import server from '../../mocks/api/server';
import { rootStateMock } from '../../mocks/stateMock';

const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Purchases', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore(rootStateMock);
  });

  describe('get purchases', () => {
    test('should return purchases successfully', async () => {
      await store.dispatch(getPurchases({ offset: 0, limit: ORDERS_LIMIT }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getPurchases.pending.type,
          payload: undefined,
        },
        {
          type: getPurchases.fulfilled.type,
          payload: {
            purchases: purchasesGetResponse.purchases,
            total: purchasesGetResponse.total,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when something went wrong.', async () => {
      const error = { message: 'Something went wrong!' };

      server.use(
        rest.get(`${BASE_API_URL}/purchases`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getPurchases({ offset: 0, limit: ORDERS_LIMIT }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getPurchases.pending.type,
          payload: undefined,
        },
        {
          type: getPurchases.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
