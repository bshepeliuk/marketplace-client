import produce from 'immer';
import React, { ReactNode } from 'react';
import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useGetCommentsByDeviceId from '@features/comments/hooks/useGetCommentsByDeviceId';
import { getCommentsByDeviceId } from '@features/comments/commentsSlice';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/comments/commentsSlice', () => ({
  ...jest.requireActual('@src/features/comments/commentsSlice'),
  __esModule: true,
  getCommentsByDeviceId: jest.fn(),
}));

describe('[HOOK]: useGetCommentsByDeviceId', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have init state and get comments on mount.', () => {
    const state = produce(rootStateMock, (draft) => {
      draft.entities.devices[deviceMock.id].comments = [];
    });

    const { result } = renderHook(() => useGetCommentsByDeviceId(deviceMock.id), {
      wrapper: (props: { children: ReactNode }) => <Wrapper {...props} state={state} />,
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.comments).toEqual([]);
  });

  test('should fetch comments on change deviceId.', () => {
    const state = produce(rootStateMock, (draft) => {
      draft.entities.devices[deviceMock.id].comments = [];
    });

    renderHook(() => useGetCommentsByDeviceId(deviceMock.id), {
      wrapper: (props: { children: ReactNode }) => <Wrapper {...props} state={state} />,
    });

    expect(getCommentsByDeviceId).toBeCalledWith({ deviceId: deviceMock.id });
    expect(dispatch).toBeCalledTimes(1);
  });

  test('In case comments were previously fetched, should return comments from cache.', () => {
    renderHook(() => useGetCommentsByDeviceId(deviceMock.id), {
      wrapper: (props: { children: ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getCommentsByDeviceId).not.toBeCalled();
  });
});
