import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { login, authActions } from '@src/features/auth/authSlice';
import { API_URL, getActionTypesAndPayload, thunk } from '../../helpers';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('auth thunks', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({});
  });

  describe('LOGIN', () => {
    test('+ user logged in successfully.', async () => {
      const loginResponse = {
        user: {
          fullName: 'Tony Stark',
          email: 'tony@stark.io',
          role: 'BUYER',
        },
      };

      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(loginResponse));
        }),
      );

      await store.dispatch(login({ email: 'tony@stark.io', password: '1234' }));

      const actualActions = store.getActions();

      const expectedActions = [
        {
          type: login.pending.type,
          payload: undefined,
        },
        { type: authActions.setLoggedIn.type, payload: { isLoggedIn: true } },
        {
          type: login.fulfilled.type,
          payload: {
            user: loginResponse.user,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('+ when password or email is incorrect.', async () => {
      const error = {
        message: 'Email or password is wrong!',
      };

      server.use(
        rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ message: error.message }));
        }),
      );

      await store.dispatch(login({ email: 'tony@stark.io', password: '1234' }));

      const actualActions = store.getActions();

      const expectedActions = [
        {
          type: login.pending.type,
          payload: undefined,
        },
        {
          type: login.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
