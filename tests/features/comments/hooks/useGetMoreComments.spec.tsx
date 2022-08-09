import React, { ReactNode } from 'react';
import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { getCommentsByDeviceId } from '@src/features/comments/commentsSlice';
import { waitFor } from '@testing-library/dom';
import useGetMoreComments from '@features/comments/hooks/useGetMoreComments';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/comments/commentsSlice', () => ({
  ...jest.requireActual('@src/features/comments/commentsSlice'),
  __esModule: true,
  getCommentsByDeviceId: jest.fn(),
}));

describe('[HOOK]: useGetMoreComments', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have init state and method for getting more comments', () => {
    const { result } = renderHook(() => useGetMoreComments(), {
      wrapper: (props: { children: ReactNode }) => (
        <Wrapper {...props} state={rootStateMock} />
      ),
    });

    expect(result.current.hasMore).toBeTruthy();
    expect(typeof result.current.getMoreByDeviceId).toBe('function');
  });

  test('should dispatch getMoreByDeviceId thunk successfully.', async () => {
    const { result } = renderHook(() => useGetMoreComments(), {
      wrapper: (props: { children: ReactNode }) => (
        <Wrapper {...props} state={rootStateMock} />
      ),
    });

    waitFor(() => {
      result.current.getMoreByDeviceId(deviceMock.id);
    });

    expect(getCommentsByDeviceId).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
