import { AnyAction, createAction, createReducer } from '@reduxjs/toolkit';
import { EntityKeys, IEntitiesState } from './types';

export const initialState: IEntitiesState = {
  devices: {},
  categories: {},
  images: {},
  info: {},
  ratings: {},
  comments: {},
};

export const updateCommentIdsForDevice = createAction<{
  ids: number[];
  deviceId: number;
}>('entities/update-comments-field');

export const incrementCommentRepliesCount = createAction<{ commentId: number }>(
  'entities/increment-replies-count',
);

const isActionWithEntities = (action: AnyAction) => {
  return action?.payload && Object.hasOwn(action.payload, 'entities');
};

const entitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCommentIdsForDevice, (state, { payload }) => {
    const device = state.devices[payload.deviceId];
    const prevComments = (device.comments as number[]) || [];

    device.comments = [...new Set(prevComments.concat(payload.ids))];
  });

  builder.addCase(incrementCommentRepliesCount, (state, { payload }) => {
    state.comments[payload.commentId].repliesCount += 1;
  });

  builder.addMatcher(isActionWithEntities, (state, action) => {
    (Object.keys(action.payload.entities) as EntityKeys[]).forEach((key) => {
      state[key] = { ...state[key], ...action.payload.entities[key] };
    });
  });
  builder.addDefaultCase((state) => state);
});

export default entitiesReducer;
