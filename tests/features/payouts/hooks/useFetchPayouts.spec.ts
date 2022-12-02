import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useFetchPayouts from '@features/payouts/hooks/useFetchPayouts';
import { getPayouts } from '@src/features/payouts/payoutsSlice';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/payouts/payoutsSlice', () => ({
  ...jest.requireActual('@src/features/payouts/payoutsSlice'),
  __esModule: true,
  getPayouts: jest.fn(),
}));

describe('[HOOK]: useFetchPayouts', () => {
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

  test('should return method for fetching payouts', () => {
    const { result } = renderHook(() => useFetchPayouts());

    expect(typeof result.current.fetchPayouts).toBe('function');
  });

  test('in case fetchPayouts method was called, should dispatch getPayouts thunk.', async () => {
    const { result } = renderHook(() => useFetchPayouts());
    const params = { startingAfter: 1, limit: 10 };

    act(() => {
      result.current.fetchPayouts(params);
    });

    expect(getPayouts).toBeCalledWith(params);
  });
});
