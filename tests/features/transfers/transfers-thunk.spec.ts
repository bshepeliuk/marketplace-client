import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import { getTransfers } from '@src/features/transfers/transfersSlice';
import { transfersGetResponse } from '../../mocks/api/responses';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import server from '../../mocks/api/server';
import { rootStateMock } from '../../mocks/stateMock';

const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Charges', () => {
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

  describe('get transfers', () => {
    test('should return transfers successfully.', async () => {
      const startingAfter = 1;
      const expectedActions = [
        {
          type: getTransfers.pending.type,
          payload: undefined,
        },
        {
          type: getTransfers.fulfilled.type,
          payload: {
            transfers: transfersGetResponse.transfers.data,
            hasMore: transfersGetResponse.transfers.has_more,
          },
        },
      ];

      await store.dispatch(getTransfers({ startingAfter }));
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
    test('should return error when something went wrong.', async () => {
      const error = { message: '[TRANSFERS: Something went wrong!' };
      const expectedActions = [
        {
          type: getTransfers.pending.type,
          payload: undefined,
        },
        {
          type: getTransfers.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];
      server.use(
        rest.get(`${BASE_API_URL}/transfers`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getTransfers({ startingAfter: 1 }));
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
