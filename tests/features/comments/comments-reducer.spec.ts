/* eslint-disable max-len */
import commentsReducer, {
  addComment,
  commentsInitialState,
  deleteComment,
  getCommentsByDeviceId,
  updateComment,
} from '@src/features/comments/commentsSlice';

describe('[REDUCER]: Comments', () => {
  test('should return initial state', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual(
      commentsInitialState,
    );
  });

  test('addComment thunk (pending): isCreating = true, isCreatingError = false', () => {
    const action = {
      type: addComment.pending.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isCreating: true,
      isCreatingError: false,
    });
  });

  test('addComment thunk (fulfilled): isCreating = false', () => {
    const action = {
      type: addComment.fulfilled.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isCreating: false,
    });
  });

  test('addComment thunk (rejected): isCreating = false, isCreatingError = true', () => {
    const action = {
      type: addComment.rejected.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isCreating: false,
      isCreatingError: true,
    });
  });

  test('getCommentsByDeviceId thunk (pending): hasMore = true, isLoading = true, isError = false', () => {
    const action = {
      type: getCommentsByDeviceId.pending.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      hasMore: true,
      isLoading: true,
      isError: false,
    });
  });

  test('getCommentsByDeviceId thunk (fulfilled): isLoading = false', () => {
    const action = {
      type: getCommentsByDeviceId.fulfilled.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isLoading: false,
    });
  });

  test('getCommentsByDeviceId thunk (rejected): isLoading = false, isError = true', () => {
    const action = {
      type: getCommentsByDeviceId.rejected.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isLoading: false,
      isError: true,
    });
  });

  test('updateComment thunk (pending): isUpdating = true, isUpdatingError = false', () => {
    const action = {
      type: updateComment.pending.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isUpdating: true,
      isUpdatingError: false,
    });
  });

  test('updateComment thunk (fulfilled): isUpdating = false', () => {
    const action = {
      type: updateComment.fulfilled.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isUpdating: false,
    });
  });

  test('updateComment thunk (rejected): isUpdating = false, isUpdatingError = true', () => {
    const action = {
      type: updateComment.rejected.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isUpdating: false,
      isUpdatingError: true,
    });
  });

  test('deleteComment thunk (pending): isDeleting = true, isDeletingError = false', () => {
    const action = {
      type: deleteComment.pending.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isDeleting: true,
      isDeletingError: false,
    });
  });

  test('deleteComment thunk (fulfilled): isDeleting = false', () => {
    const action = {
      type: deleteComment.fulfilled.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isDeleting: false,
    });
  });

  test('deleteComment thunk (rejected): isDeleting = false, isDeletingError = true', () => {
    const action = {
      type: deleteComment.rejected.type,
    };

    expect(commentsReducer(commentsInitialState, action)).toEqual({
      ...commentsInitialState,
      isDeleting: false,
      isDeletingError: true,
    });
  });
});
