import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { login, authActions } from '../../../src/features/auth/authSlice';
import { thunk } from '../../helpers';

const mockStore = configureMockStore([thunk]);

const loginResponse = {
  user: {
    fullName: 'Tony Stark',
    email: 'tony@stark.io',
    role: 'BUYER',
  },
};

const getActionTypesAndPayload = (actions) => {
  return actions.map(({ meta, error, ...actionProps }) => ({ ...actionProps }));
};

const API_URL = 'http://localhost:3000/api';

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(loginResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe('auth thunks', () => {
  let store;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({});
  });

  describe('LOGIN', () => {
    test('+ user logged in successfully.', async () => {
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
