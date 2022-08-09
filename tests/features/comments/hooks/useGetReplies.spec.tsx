/* eslint-disable max-len */
import React, { ReactNode } from 'react';
import * as ReactRedux from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import { getReplies } from '@features/comments/commentsSlice';
import useGetRepliesByRootCommentId from '@features/comments/hooks/useGetReplies';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { commentMock } from '../../../mocks/data';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@features/comments/commentsSlice', () => ({
  ...jest.requireActual('@features/comments/commentsSlice'),
  __esModule: true,
  getReplies: jest.fn(),
}));

describe('[HOOK]: useGetRepliesByRootCommentId', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have init state and method for fetching replies by root comment id.', () => {
    const { result } = renderHook(
      () => useGetRepliesByRootCommentId(commentMock.id),
      {
        wrapper: (props: { children: ReactNode }) => (
          <Wrapper {...props} state={rootStateMock} />
        ),
      },
    );

    expect(result.current.isRepliesLoading).toBeFalsy();
    expect(typeof result.current.fetchReplies).toBe('function');
  });

  test('should dispatch getReplies thunk successfully.', async () => {
    const { result } = renderHook(
      () => useGetRepliesByRootCommentId(commentMock.id),
      {
        wrapper: (props: { children: ReactNode }) => (
          <Wrapper {...props} state={rootStateMock} />
        ),
      },
    );

    act(() => {
      result.current.fetchReplies();
    });

    expect(getReplies).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
