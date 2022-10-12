import { renderHook } from '@testing-library/react-hooks';
import { useSearchParams } from 'react-router-dom';

import useGetPrevSearchOrderOption from '@src/features/orders/hooks/useGetPrevSearchOrderOption';
import { SEARCH_ORDER_OPTIONS } from '@src/features/orders/constants';
import { Wrapper } from '../../../wrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest.fn().mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

describe('[HOOK]: useGetPrevSearchOrderOption', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have initial values.', () => {
    const { result } = renderHook(() => useGetPrevSearchOrderOption(), { wrapper: Wrapper });

    expect(typeof result.current.getPrevSearchOptionFromParams).toBe('function');
  });

  test('should return search order option from search params.', () => {
    const orderIdOption = SEARCH_ORDER_OPTIONS.find((item) => item.fieldName === 'id');
    const orderIdValue = 1;

    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(`?id=${orderIdValue}`), jest.fn()]);

    const { result } = renderHook(() => useGetPrevSearchOrderOption(), { wrapper: Wrapper });

    const prevOption = result.current.getPrevSearchOptionFromParams(SEARCH_ORDER_OPTIONS);

    expect(prevOption).toEqual(orderIdOption);
  });

  test('in case search params do not have search order options, should return undefined. ', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(`?someOptionFieldName=1`), jest.fn()]);

    const { result } = renderHook(() => useGetPrevSearchOrderOption(), { wrapper: Wrapper });

    const prevOption = result.current.getPrevSearchOptionFromParams(SEARCH_ORDER_OPTIONS);

    expect(prevOption).toBeUndefined();
  });
});
