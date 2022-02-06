import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { logout } from '@src/features/auth/authSlice';
import { waitFor } from '@testing-library/dom';
import useLogout from '@src/features/auth/hooks/useLogout';
import { persistor } from '@src/app/store';
import wrapper from '../../../wrapper';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  };
});

jest.mock('@src/features/auth/authSlice', () => ({
  ...jest.requireActual('@src/features/auth/authSlice'),
  __esModule: true,
  logout: jest.fn(),
}));

jest.mock('@src/app/store', () => ({
  ...jest.requireActual('@src/app/store'),
  __esModule: true,
  persistor: {
    pause: jest.fn(),
  },
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
const localStorageRemoveItemMock = jest.spyOn(Storage.prototype, 'removeItem');

describe('useLogout hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('call onLogout function', async () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper,
    });

    waitFor(() => {
      result.current.onLogout();
      expect(mockedNavigate).toHaveBeenCalledWith('/auth/login');
    });

    expect(localStorageRemoveItemMock).toHaveBeenCalledWith('persist:auth');
    expect(persistor.pause).toHaveBeenCalledTimes(1);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
