import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useRegister from '@src/features/auth/hooks/useRegister';
import { register } from '@src/features/auth/authSlice';
import { ROLE } from '@src/common/types/apiTypes';

jest.mock('@src/features/auth/authSlice', () => {
  const originalModule = jest.requireActual('@src/features/auth/authSlice');

  return {
    __esModule: true,
    ...originalModule,
    register: jest.fn(),
  };
});

const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

describe('useRegister hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('call onRegister function', () => {
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.onRegister({
        email: 'tony@stark.star',
        password: '1234',
        role: ROLE.BUYER,
        fullName: 'Tony Stark',
      });
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith({
      email: 'tony@stark.star',
      password: '1234',
      role: ROLE.BUYER,
      fullName: 'Tony Stark',
    });
  });
});
