import { renderHook } from '@testing-library/react-hooks';
import useCommentsContext from '@src/features/comments/hooks/useCommentsContext';

describe('[HOOKS]: useCommentsContext', () => {
  test('should return error when hooks was not wrapped in CommentsProvider', () => {
    const { result } = renderHook(useCommentsContext);

    expect(result.error?.message).toBe(
      'useCommentsContext must be used within a CommentsProvider.',
    );
  });
});
