import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

const getEntitiesState = (state: RootState) => state.entities;
const getCommentsState = (state: RootState) => state.comments;
const getDeviceIdProp = (_: unknown, deviceId: number) => deviceId;

export const commentsSelector = createSelector(
  [getEntitiesState, getCommentsState, getDeviceIdProp],
  (entities, commentsState, deviceId) => {
    const { isLoading, isError } = commentsState;

    const device = entities.devices[deviceId];

    const commentIds = (device.comments as Array<number>) ?? [];

    const comments = commentIds.map(
      (commentId) => entities.comments[commentId],
    );

    return {
      isError,
      isLoading,
      comments,
    };
  },
);
