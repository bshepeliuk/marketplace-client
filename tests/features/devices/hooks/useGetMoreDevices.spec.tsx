import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/dom';
import useGetMoreDevices from '@src/features/devices/hooks/useGetMoreDevices';
import { getMoreDevices } from '@src/features/devices/devicesSlice';
import wrapper from '../../../wrapper';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getMoreDevices: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('useGetMoreDevices hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('call fetchMore function', async () => {
    const { result } = renderHook(() => useGetMoreDevices(), { wrapper });

    waitFor(() => {
      result.current.fetchMore();
    });

    expect(getMoreDevices).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      hasMore: expect.any(Boolean),
      isLoadingMore: expect.any(Boolean),
      fetchMore: expect.any(Function),
    });
  });
});
