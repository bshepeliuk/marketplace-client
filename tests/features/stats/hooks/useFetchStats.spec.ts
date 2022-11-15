import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useFetchStats from '@src/features/stats/hooks/useFetchStats';
import { getStats } from '@src/features/stats/statsSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/stats/statsSlice', () => ({
  ...jest.requireActual('@src/features/stats/statsSlice'),
  __esModule: true,
  getStats: jest.fn(),
}));

describe('[HOOK]: useFetchStats', () => {
  const dispatch = jest.fn();

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have initial values.', () => {
    const { result } = renderHook(() => useFetchStats(), { wrapper: Wrapper });

    expect(typeof result.current.fetchStats).toBe('function');
  });

  test('in case fetchStats method was called, should dispatch getStats thunk.', async () => {
    const { result } = renderHook(() => useFetchStats(), { wrapper: Wrapper });

    act(() => {
      result.current.fetchStats({ filters: [] });
    });

    expect(getStats).toBeCalledWith({ filters: [] });
  });
});
