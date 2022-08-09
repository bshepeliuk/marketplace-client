import * as ReactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useAddComment from '@features/comments/hooks/useAddComment';
import { addComment } from '@features/comments/commentsSlice';
import { Wrapper } from '../../../wrapper';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@features/comments/commentsSlice', () => ({
  ...jest.requireActual('@features/comments/commentsSlice'),
  __esModule: true,
  addComment: jest.fn(),
}));

describe('[HOOK]: useAddComment', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have init state and method for adding a new comment', () => {
    const { result } = renderHook(useAddComment, {
      wrapper: Wrapper,
    });

    expect(result.current.isCreating).toBeFalsy();
    expect(result.current.isCreatingError).toBeFalsy();
    expect(typeof result.current.onAdd).toBe('function');
  });

  test('onAdd should call addComment thunk', async () => {
    const { result } = renderHook(useAddComment, {
      wrapper: Wrapper,
    });

    const comment = {
      body: 'test comment',
      deviceId: 1,
      parentId: null,
    };

    act(() => {
      result.current.onAdd(comment);
    });

    expect(addComment).toBeCalledWith(comment);
  });
});
