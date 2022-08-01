import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import sortByDate from '@src/common/utils/sortByDate';
import { IDevice } from '@src/features/devices/types';

const getEntitiesState = (state: RootState) => state.entities;
const getCommentsState = (state: RootState) => state.comments;
const getCommentIdProp = (_: unknown, deviceId: number) => deviceId;

export const getCommentByIdSelector = (state: RootState, commentId: number) => {
  return state.entities.comments[commentId];
};

export const commentsSelector = createSelector(
  [getEntitiesState, getCommentsState, getCommentIdProp],
  (entities, commentsState, deviceId) => {
    const { isLoading, isError } = commentsState;

    const device = entities.devices[deviceId];

    const commentIds = (device.comments as Array<number>) ?? [];
    const uniqueIds = [...new Set(commentIds)];

    const comments = uniqueIds
      .map((commentId) => entities.comments[commentId])
      .filter((comment) => comment.parentId === null);

    const sortedComments = sortByDate({
      data: comments,
      sortField: 'createdAt',
    });

    return {
      isError,
      isLoading,
      comments: sortedComments,
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

    const sortedReplies = sortByDate({ data: replies, sortField: 'createdAt' });

    return {
      replies: sortedReplies,
    };
  },
);
