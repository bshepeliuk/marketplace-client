import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';

import { BASE_API_URL } from '@src/common/constants';
import { getOrders } from '@src/features/orders/ordersSlice';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import { ordersGetResponse } from '../../mocks/api/responses';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import server from '../../mocks/api/server';
import { rootStateMock } from '../../mocks/stateMock';

const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Orders', () => {
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

  describe('get orders', () => {
    test('should return orders successfully', async () => {
      await store.dispatch(getOrders({ offset: 0, limit: ORDERS_LIMIT }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getOrders.pending.type,
          payload: undefined,
        },
        {
          type: getOrders.fulfilled.type,
          payload: {
            orders: ordersGetResponse.orders,
            total: ordersGetResponse.total,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when something went wrong.', async () => {
      const error = { message: 'Something went wrong!' };

      server.use(
        rest.get(`${BASE_API_URL}/orders`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getOrders({ offset: 0, limit: ORDERS_LIMIT }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getOrders.pending.type,
          payload: undefined,
        },
        {
          type: getOrders.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
