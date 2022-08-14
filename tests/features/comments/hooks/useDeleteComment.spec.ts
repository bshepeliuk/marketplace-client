import * as ReactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import { deleteComment } from '@features/comments/commentsSlice';
import useDeleteComment from '@src/features/comments/hooks/useDeleteComment';
import { Wrapper } from '../../../wrapper';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@features/comments/commentsSlice', () => ({
  ...jest.requireActual('@features/comments/commentsSlice'),
  __esModule: true,
  deleteComment: jest.fn(),
}));

describe('[HOOK]: useDeleteComment', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have init state and method for deleting comments.', () => {
    const { result } = renderHook(useDeleteComment, {
      wrapper: Wrapper,
    });

    expect(result.current.isDeleting).toBeFalsy();
    expect(result.current.isDeletingError).toBeFalsy();
    expect(typeof result.current.onDelete).toBe('function');
  });

  test('onDelete method should dispatch deleteComment thunk', async () => {
    const { result } = renderHook(useDeleteComment, {
      wrapper: Wrapper,
    });

    const comment = {
      id: 1,
      body: 'test comment',
      deviceId: 1,
      parentId: null,
    };

    act(() => {
      result.current.onDelete({ commentId: comment.id });
    });

    expect(deleteComment).toBeCalledWith({ commentId: comment.id });
  });
});
