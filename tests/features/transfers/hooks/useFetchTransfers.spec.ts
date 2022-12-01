import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useFetchTransfers from '@src/features/transfers/hooks/useFetchTransfers';
import { getTransfers } from '@src/features/transfers/transfersSlice';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/transfers/transfersSlice', () => ({
  ...jest.requireActual('@src/features/transfers/transfersSlice'),
  __esModule: true,
  getTransfers: jest.fn(),
}));

describe('[HOOK]: useFetchTransfers', () => {
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

  test('should return method for fetching charges', () => {
    const { result } = renderHook(() => useFetchTransfers());

    expect(typeof result.current.fetchTransfers).toBe('function');
  });

  test('in case fetchTransfers method was called, should dispatch getTransfers thunk.', async () => {
    const { result } = renderHook(() => useFetchTransfers());
    const params = { startingAfter: 1, limit: 10 };

    act(() => {
      result.current.fetchTransfers(params);
    });

    expect(getTransfers).toBeCalledWith(params);
  });
});
