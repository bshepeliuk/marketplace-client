/* eslint-disable max-len */
import React, { ReactNode } from 'react';
import * as ReactRedux from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import useUpdateComment from '@features/comments/hooks/useUpdateComment';
import { updateComment } from '@features/comments/commentsSlice';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@features/comments/commentsSlice', () => ({
  ...jest.requireActual('@features/comments/commentsSlice'),
  __esModule: true,
  updateComment: jest.fn(),
}));

describe('[HOOK]: useUpdateComment', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have init state and method for updating comment.', () => {
    const { result } = renderHook(() => useUpdateComment(), {
      wrapper: (props: { children: ReactNode }) => (
        <Wrapper {...props} state={rootStateMock} />
      ),
    });

    expect(result.current.isUpdating).toBeFalsy();
    expect(result.current.isUpdatingError).toBeFalsy();
    expect(typeof result.current.onUpdate).toBe('function');
  });

  test('should dispatch updateComment thunk successfully.', async () => {
    const { result } = renderHook(() => useUpdateComment(), {
      wrapper: (props: { children: ReactNode }) => (
        <Wrapper {...props} state={rootStateMock} />
      ),
    });

    const commentUpdInfo = {
      body: 'update comment',
      commentId: 1,
    };

    act(() => {
      result.current.onUpdate(commentUpdInfo);
    });

    expect(updateComment).toBeCalledWith(commentUpdInfo);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
