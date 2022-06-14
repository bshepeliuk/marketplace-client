import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import thunk from 'redux-thunk';
import { authActions } from '@src/features/auth/authSlice';
import { initialization } from '@src/features/app/appSlice';
import { BASE_API_URL } from '@src/common/constants';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('APP THUNKS', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({});
  });

  test('should get user account info during initialization.', async () => {
    const userResponse = {
      user: {
        fullName: 'Tony Stark',
        email: 'tony@stark.io',
        role: 'BUYER',
      },
    };

    server.use(
      rest.get(`${BASE_API_URL}/user`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(userResponse));
      }),
    );

    await store.dispatch(initialization());

    const actualActions = store.getActions();
    const expectedActions = [
      {
        type: initialization.pending.type,
        payload: undefined,
      },
      {
        type: authActions.setUser.type,
        payload: {
          user: userResponse.user,
        },
      },
      {
        type: initialization.fulfilled.type,
        payload: undefined,
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });

  test('should be rejected with error.message from API.', async () => {
    const erroResponse = {
      message: '[USER ACCOUNT]: Something went wrong!',
    };

    server.use(
      rest.get(`${BASE_API_URL}/user`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(erroResponse));
      }),
    );

    await store.dispatch(initialization());

    const actualActions = store.getActions();
    const expectedActions = [
      {
        type: initialization.pending.type,
        payload: undefined,
      },

      {
        type: initialization.rejected.type,
        payload: erroResponse,
      },
    ];

    expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
  });
});
