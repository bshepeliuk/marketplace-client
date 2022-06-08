import { ROLES } from '@src/common/constants';
import authReducer, {
  authActions,
  initialState,
  login,
  logout,
  register,
} from '@src/features/auth/authSlice';

describe('AUTH REDUCER', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(authReducer(initialState, action)).toEqual(initialState);
  });

  test('isLoggedIn should be true when user logged in successfully', () => {
    const action = {
      type: authActions.setLoggedIn.type,
      payload: { isLoggedIn: true },
    };

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoggedIn: true,
    });
  });

  test('isLoggedIn should be false when user logged out from out', () => {
    const action = {
      type: authActions.setLoggedIn.type,
      payload: { isLoggedIn: false },
    };

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoggedIn: false,
    });
  });

  test('should set user in state', () => {
    const user = {
      fullName: 'Leam Neeson',
      email: 'leam@neeson.io',
      role: ROLES.BUYER,
    };

    const action = {
      type: authActions.setUser.type,
      payload: { user },
    };

    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      user,
    });
  });

  describe('LOGIN', () => {
    test('- pending action', () => {
      const action = {
        type: login.pending.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        login: {
          ...initialState.login,
          isError: false,
          isLoading: true,
        },
      });
    });

    test('- fulfilled action', () => {
      const user = {
        fullName: 'Leam Neeson',
        email: 'leam@neeson.io',
        role: ROLES.BUYER,
      };

      const action = {
        type: login.fulfilled.type,
        payload: { user },
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        user,
        isLoggedIn: true,
        login: {
          ...initialState.login,
          isLoading: false,
        },
      });
    });

    test('- rejected action', () => {
      const error = {
        message: '[LOGIN]: Something went wrong!',
      };

      const action = {
        type: login.rejected.type,
        payload: { ...error },
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        login: {
          ...initialState.login,
          isError: true,
          isLoading: false,
        },
      });
    });
  });

  describe('REGISTRATION', () => {
    test('- pending action', () => {
      const action = {
        type: register.pending.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        register: {
          ...initialState.register,
          isError: false,
          isLoading: true,
        },
      });
    });

    test('- fulfilled action', () => {
      const action = {
        type: register.fulfilled.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        register: {
          ...initialState.register,
          isLoading: false,
        },
      });
    });

    test('- rejected action', () => {
      const action = {
        type: register.rejected.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        register: {
          ...initialState.register,
          isError: true,
          isLoading: false,
        },
      });
    });
  });

  describe('LOGOUT', () => {
    test('- pending action', () => {
      const action = {
        type: logout.pending.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        logout: {
          ...initialState.logout,
          isLoading: true,
        },
      });
    });

    test('- fulfilled action', () => {
      const action = {
        type: logout.fulfilled.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        logout: {
          ...initialState.logout,
          isLoading: false,
        },
      });
    });

    test('- rejected action', () => {
      const action = {
        type: logout.rejected.type,
      };

      expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        logout: {
          ...initialState.logout,
          isError: true,
          isLoading: false,
        },
      });
    });
  });
});
