/* eslint-disable max-len */
import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { commentsActions } from '@src/features/comments/commentsSlice';
import thunk from 'redux-thunk';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import { rootStateMock } from '../../mocks/stateMock';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('[ACTIONS]: Comments', () => {
  let store: any;

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => server.close());

  beforeEach(() => {
    store = mockStore(rootStateMock);
  });

  test('should set hasMore flag successfully.', () => {
    store.dispatch(commentsActions.setHasMore({ hasMore: false }));

    const actualActions = store.getActions();
    const expectedActions = [
      {
        type: commentsActions.setHasMore.type,
        payload: { hasMore: false },
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });
});
