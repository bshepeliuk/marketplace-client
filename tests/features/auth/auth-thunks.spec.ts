import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import {
  login,
  authActions,
  logout,
  register,
} from '@src/features/auth/authSlice';
import { ROLE } from '@common/types/apiTypes';
import { BASE_API_URL } from '@src/common/constants';
import thunk from 'redux-thunk';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('AUTH THUNKS', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({});
  });

  describe('LOGIN', () => {
    test('- user logged in successfully.', async () => {
      const loginResponse = {
        user: {
          fullName: 'Tony Stark',
          email: 'tony@stark.io',
          role: 'BUYER',
        },
      };

      server.use(
        rest.post(`${BASE_API_URL}/auth/login`, (req, res, ctx) => {
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

    test('- when password or email is incorrect.', async () => {
      const error = {
        message: 'Email or password is wrong!',
      };

      server.use(
        rest.post(`${BASE_API_URL}/auth/login`, (req, res, ctx) => {
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

  describe('LOGOUT', () => {
    test('- when user successfully logged out.', async () => {
      server.use(
        rest.post(`${BASE_API_URL}/auth/logout`, (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );

      await store.dispatch(logout());

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: logout.pending.type,
          payload: undefined,
        },
        {
          type: authActions.setLoggedIn.type,
          payload: {
            isLoggedIn: false,
          },
        },
        {
          type: logout.fulfilled.type,
          payload: undefined,
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
    // eslint-disable-next-line max-len
    test('- should return error when user can not logout from account.', async () => {
      const logoutResponseError = {
        message: '[LOGOUT] Something went wrong!!!',
      };

      server.use(
        rest.post(`${BASE_API_URL}/auth/logout`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(logoutResponseError));
        }),
      );

      await store.dispatch(logout());

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: logout.pending.type,
          payload: undefined,
        },
        {
          type: authActions.setLoggedIn.type,
          payload: {
            isLoggedIn: false,
          },
        },
        {
          type: logout.rejected.type,
          payload: logoutResponseError,
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('REGISTRATION', () => {
    const user = {
      fullName: 'John Wick',
      email: 'john@wick.io',
      role: ROLE.BUYER,
    };

    test('- when registration completed successfully', async () => {
      server.use(
        rest.post(`${BASE_API_URL}/auth/register`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ user }));
        }),
      );

      await store.dispatch(register({ ...user, password: '1111' }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: register.pending.type,
          payload: undefined,
        },
        {
          type: register.fulfilled.type,
          payload: { user },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('- when registration completed with unsuccessfully', async () => {
      const registrationResponseError = {
        message: '[REGISTRATION]: Something went wrong!!!',
      };

      server.use(
        rest.post(`${BASE_API_URL}/auth/register`, (req, res, ctx) => {
          return res(ctx.status(400), ctx.json(registrationResponseError));
        }),
      );

      await store.dispatch(register({ ...user, password: '1111' }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: register.pending.type,
          payload: undefined,
        },
        {
          type: register.rejected.type,
          payload: registrationResponseError,
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
