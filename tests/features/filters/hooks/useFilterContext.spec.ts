import { renderHook } from '@testing-library/react-hooks';
import useFilterContext from '@src/features/filters/hooks/useFilterContext';

describe('[HOOKS]: useFilterContext', () => {
  test('should return error when hooks was not wrapped in FilterProvider', () => {
    const { result } = renderHook(() => useFilterContext());

    expect(result.error?.message).toBe(
      'useFilterContext must be used within a FilterProvider.',
    );
  });
});
