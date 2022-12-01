import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useFetchCharges from '@src/features/charges/hooks/useFetchCharges';
import { getCharges } from '@src/features/charges/chargesSlice';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/charges/chargesSlice', () => ({
  ...jest.requireActual('@src/features/charges/chargesSlice'),
  __esModule: true,
  getCharges: jest.fn(),
}));

describe('[HOOK]: useFetchCharges', () => {
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
    const { result } = renderHook(() => useFetchCharges());

    expect(typeof result.current.fetchCharges).toBe('function');
  });

  test('in case fetchCharges method was called, should dispatch getCharges thunk.', async () => {
    const { result } = renderHook(() => useFetchCharges());
    const params = { startingAfter: 1, limit: 10 };

    act(() => {
      result.current.fetchCharges(params);
    });

    expect(getCharges).toBeCalledWith(params);
  });
});
