import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';

import { getStats } from '@src/features/stats/statsSlice';
import { BASE_API_URL } from '@src/common/constants';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import server from '../../mocks/api/server';
import { rootStateMock } from '../../mocks/stateMock';
import { statsGetResponse } from '../../mocks/api/responses';

const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Stats', () => {
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

  describe('get stats', () => {
    test('should return stats successfully.', async () => {
      await store.dispatch(getStats({ offset: 0 }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getStats.pending.type,
          payload: undefined,
        },
        {
          type: getStats.fulfilled.type,
          payload: statsGetResponse,
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when something went wrong.', async () => {
      const error = { message: '[STATS-API]: Something went wrong!' };

      server.use(
        rest.get(`${BASE_API_URL}/stats`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(error));
        }),
      );

      await store.dispatch(getStats({ offset: 0 }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getStats.pending.type,
          payload: undefined,
        },
        {
          type: getStats.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];
      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
