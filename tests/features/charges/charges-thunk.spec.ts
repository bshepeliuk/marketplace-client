import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { getCharges } from '@src/features/charges/chargesSlice';
import { BASE_API_URL } from '@src/common/constants';
import { chargesGetResponse } from '../../mocks/api/responses';
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

  describe('get charges', () => {
    test('should return charges successfully.', async () => {
      const startingAfter = 1;
      const expectedActions = [
        {
          type: getCharges.pending.type,
          payload: undefined,
        },
        {
          type: getCharges.fulfilled.type,
          payload: {
            charges: chargesGetResponse.charges.data,
            hasMore: chargesGetResponse.charges.has_more,
          },
        },
      ];

      await store.dispatch(getCharges({ startingAfter }));
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
    test('should return error when something went wrong.', async () => {
      const error = { message: '[CHARGES: Something went wrong!' };
      const expectedActions = [
        {
          type: getCharges.pending.type,
          payload: undefined,
        },
        {
          type: getCharges.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];
      server.use(
        rest.get(`${BASE_API_URL}/charges`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getCharges({ startingAfter: 1 }));
      const actualActions = store.getActions();

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
