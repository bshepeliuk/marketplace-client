import { renderHook } from '@testing-library/react-hooks';
import useSearchContext from '@src/features/search/hooks/useSearchContext';

describe('[HOOKS]: useSearchContext', () => {
  test('should return error when hooks was not wrapped in SearchProvider', () => {
    const { result } = renderHook(() => useSearchContext());

    expect(result.error?.message).toBe(
      'useSearchContext must be used within a SearchProvider.',
    );
  });
});
