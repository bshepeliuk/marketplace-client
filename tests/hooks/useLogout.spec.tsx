import * as ReactRedux from 'react-redux';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { logout } from '@src/features/auth/authSlice';
import { waitFor } from '@testing-library/dom';
import useLogout from '@src/features/auth/hooks/useLogout';
import store from '@src/app/store';
import { MemoryRouter } from 'react-router-dom';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
  };
});

jest.mock('@src/features/auth/authSlice', () => {
  const originalModule = jest.requireActual('@src/features/auth/authSlice');

  return {
    ...originalModule,
    __esModule: true,
    logout: jest.fn(),
  };
});

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('useLogout hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('call onLogout function', async () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: ({ children }) => (
        <ReactRedux.Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </ReactRedux.Provider>
      ),
    });

    waitFor(() => {
      result.current.onLogout();
      expect(mockedNavigate).toHaveBeenCalledWith('/auth/login');
    });

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
