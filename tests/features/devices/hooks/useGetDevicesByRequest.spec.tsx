import * as ReactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchParams } from 'react-router-dom';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetDevicesByRequest from '@src/features/devices/hooks/useGetDevicesByRequest';
import { Wrapper } from '../../../wrapper';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDevices: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
  useNavigate: () => mockNavigate,
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('useGetDevicesByRequest hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should get devices by request and then navigate to HomePage', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('?categoryId=1'),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useGetDevicesByRequest(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.getAll();
    });

    expect(getDevices).toBeCalledWith({ limit: 20, offset: 0 });
    expect(mockNavigate).toBeCalledWith({ pathname: '/', search: undefined });
  });

  test('should not fetch devices by request when categoryId was not provided.', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useGetDevicesByRequest(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.getAll();
    });

    expect(getDevices).toBeCalledTimes(0);
    expect(mockNavigate).not.toBeCalled();
  });
});
