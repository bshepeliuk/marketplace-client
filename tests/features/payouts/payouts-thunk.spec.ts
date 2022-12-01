import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import { getPayouts } from '@src/features/payouts/payoutsSlice';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import server from '../../mocks/api/server';
import { rootStateMock } from '../../mocks/stateMock';
import { payoutsGetResponse } from '../../mocks/api/responses';

const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Payouts', () => {
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

  describe('get charges', () => {
    test('should return payouts successfully.', async () => {
      const startingAfter = 1;
      const expectedActions = [
        {
          type: getPayouts.pending.type,
          payload: undefined,
        },
        {
          type: getPayouts.fulfilled.type,
          payload: {
            payouts: payoutsGetResponse.payouts.data,
            hasMore: payoutsGetResponse.payouts.has_more,
          },
        },
      ];

      await store.dispatch(getPayouts({ startingAfter }));
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
    test('should return error when something went wrong.', async () => {
      const error = { message: '[CHARGES: Something went wrong!' };
      const expectedActions = [
        {
          type: getPayouts.pending.type,
          payload: undefined,
        },
        {
          type: getPayouts.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];
      server.use(
        rest.get(`${BASE_API_URL}/payouts`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getPayouts({ startingAfter: 1 }));
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
