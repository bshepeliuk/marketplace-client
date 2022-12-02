import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import { getBalance } from '@src/features/balance/balanceSlice';
import { balanceGetResponse } from '../../mocks/api/responses';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import server from '../../mocks/api/server';
import { rootStateMock } from '../../mocks/stateMock';

const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Balance', () => {
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

  describe('get balance', () => {
    test('should return charges successfully.', async () => {
      const expectedActions = [
        {
          type: getBalance.pending.type,
          payload: undefined,
        },
        {
          type: getBalance.fulfilled.type,
          payload: {
            balance: balanceGetResponse.balance,
          },
        },
      ];

      await store.dispatch(getBalance());
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when something went wrong.', async () => {
      const error = { message: '[BALANCE]: Something went wrong!' };
      const expectedActions = [
        {
          type: getBalance.pending.type,
          payload: undefined,
        },
        {
          type: getBalance.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];
      server.use(
        rest.get(`${BASE_API_URL}/balance`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getBalance());
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
