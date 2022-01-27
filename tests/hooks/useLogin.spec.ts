import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useLogin from '@src/features/auth/hooks/useLogin';
import { login } from '@src/features/auth/authSlice';

jest.mock('@src/features/auth/authSlice', () => {
  const originalModule = jest.requireActual('@src/features/auth/authSlice');

  return {
    __esModule: true,
    ...originalModule,
    login: jest.fn(),
  };
});

const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

describe('useLogin hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('call onLogin function', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onLogin({ email: 'tony@stark.star', password: '1234' });
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith({
      email: 'tony@stark.star',
      password: '1234',
    });
  });
});
