import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import { IDevice } from '@src/features/devices/types';

const getEntitiesState = (state: RootState) => state.entities;
const getCommentsState = (state: RootState) => state.comments;
const getCommentIdProp = (_: unknown, deviceId: number) => deviceId;

export const commentsSelector = createSelector(
  [getEntitiesState, getCommentsState, getCommentIdProp],
  (entities, commentsState, deviceId) => {
    const { isLoading, isError } = commentsState;

    const device = entities.devices[deviceId];

    const commentIds = (device.comments as Array<number>) ?? [];

    const comments = commentIds
      .map((commentId) => entities.comments[commentId])
      .filter((comment) => comment.parentId === null);

    return {
      isError,
      isLoading,
      comments,
    };
  },
);

export const repliesSelector = createSelector(
  [getEntitiesState, getCommentIdProp],
  (entities, commentId) => {
    const comment = entities.comments[commentId];
    const device = entities.devices[comment.deviceId] as IDevice;

    const replies = (device.comments as number[])
      .map((id) => entities.comments[id])
      .filter((item) => item.parentId === commentId);

    return {
      replies,
    };
  },
);
