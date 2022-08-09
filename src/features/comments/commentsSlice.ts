import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import calculateOffsetValue from '@common/utils/calculateOffsetValue';
import notifications from '@common/utils/notifications';
import {
  IAddCommentParams,
  IGetRepliesParams,
  IUpdateCommentParams,
} from '@src/common/types/apiTypes';
import {
  CommentSchema,
  CommentsSchema,
  DeviceSchema,
} from '@src/common/normalizeSchemas';
import {
  IComment,
  ICommentEntities,
  INewCommentEntity,
  IUpdateCommentEntity,
} from './types';
import { DeviceEntities, IDevice, IDeviceEntityData } from '../devices/types';
import {
  commentsSelector,
  getCommentByIdSelector,
  repliesSelector,
} from './selectors/commentsSelector';
import { getDeviceByIdSelector } from '../devices/selectors/deviceSelector';
import { COMMENTS_LIMIT, REPLIES_LIMIT } from './constants';
import { incrementCommentRepliesCount } from '../entities/entitiesReducer';
import updateCommentIdsForDevice from './helpers/updateCommentIdsForDevice';

export const initialState = {
  isError: false,
  isLoading: false,
  isCreating: false,
  isCreatingError: false,
  isUpdating: false,
  isUpdatingError: false,
  isDeleting: false,
  isDeletingError: false,
  isRepliesLoading: false,
  isRepliesError: false,
  hasMore: true,
};

type State = typeof initialState;

export const addComment = createAsyncThunk<
  INewCommentEntity,
  IAddCommentParams,
  IThunkAPI
>(
  'comments/create',
  async (
    { deviceId, parentId, body },
    { rejectWithValue, getState, dispatch },
  ) => {
    const state = getState();

    try {
      const { data } = await Api.Comments.add({
        deviceId,
        parentId,
        body,
      });

      const comment = getCommentByIdSelector(state, data.comment.parentId);
      const isRootComment = comment !== undefined;

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(data.comment, CommentSchema);

      if (isRootComment) {
        dispatch(incrementCommentRepliesCount({ commentId: comment.id }));
      }

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId,
        devices: state.entities.devices,
        ids: [result],
      });

      return {
        result,
        entities: {
          ...entities,
          devices: nextDeviceState,
        },
      };
    } catch (error) {
      const message = getErrorMessage(error);

      notifications.error(message);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const getCommentsByDeviceId = createAsyncThunk<
  ICommentEntities,
  { deviceId: number },
  IThunkAPI
>(
  'comments/fetch-by-deviceId',
  async ({ deviceId }, { rejectWithValue, getState, dispatch }) => {
    const state = getState();

    const { comments } = commentsSelector(state, deviceId);

    const offset = calculateOffsetValue({
      amount: comments.length,
      limit: COMMENTS_LIMIT,
    });

    try {
      const { data } = await Api.Comments.getByDeviceId({
        deviceId,
        offset,
        limit: COMMENTS_LIMIT,
      });

      if (data.comments.length < REPLIES_LIMIT) {
        dispatch(commentsActions.setHasMore({ hasMore: false }));
      }

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number[]
      >(data.comments, CommentsSchema);

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId,
        devices: state.entities.devices,
        ids: result,
      });

      return {
        result,
        entities: {
          ...entities,
          devices: nextDeviceState,
        },
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const getReplies = createAsyncThunk<
  ICommentEntities,
  IGetRepliesParams,
  IThunkAPI
>(
  'comments/get-replies-by-root-commentId',
  async ({ commentId }, { rejectWithValue, getState }) => {
    const state = getState();

    const { replies } = repliesSelector(state, commentId);
    const rootComment = getCommentByIdSelector(state, commentId);

    const offset = calculateOffsetValue({
      amount: replies.length,
      limit: REPLIES_LIMIT,
    });

    try {
      const { data } = await Api.Comments.getRepliesByRootCommentId({
        commentId,
        offset,
        limit: 20,
      });

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments' | 'devices'>,
        number[]
      >(data.replies, CommentsSchema);

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId: rootComment.deviceId,
        devices: state.entities.devices,
        ids: result,
      });

      return {
        result,
        entities: {
          ...entities,
          devices: nextDeviceState,
        },
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const updateComment = createAsyncThunk<
  IUpdateCommentEntity,
  IUpdateCommentParams,
  IThunkAPI
>(
  'comments/update-by-commentId',
  async ({ commentId, body }, { rejectWithValue, getState }) => {
    const state = getState();

    const rootComment = getCommentByIdSelector(state, commentId);

    try {
      const { data } = await Api.Comments.updateByCommentId({
        commentId,
        body,
      });

      const comment = {
        ...data.comment,
        ...(rootComment.repliesCount && {
          repliesCount: rootComment.repliesCount,
        }),
      };

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(comment, CommentSchema);

      return {
        result,
        entities,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      notifications.error(message);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const deleteComment = createAsyncThunk<
  IDeviceEntityData,
  Pick<IUpdateCommentParams, 'commentId'>,
  IThunkAPI
>(
  'comments/delete-by-commentId',
  async ({ commentId }, { rejectWithValue, getState }) => {
    const state = getState();

    const comment = getCommentByIdSelector(state, commentId);
    const device = getDeviceByIdSelector(state, comment.deviceId);

    try {
      await Api.Comments.deleteById(commentId);

      const updatedComments = (device.comments as Array<number>).filter(
        (id) => commentId !== id,
      );

      const updatedDevice = {
        ...device,
        comments: updatedComments,
      };

      const { result, entities } = normalize<IDevice, DeviceEntities, number>(
        updatedDevice,
        DeviceSchema,
      );

      return {
        result,
        entities,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      notifications.error(message);

      return rejectWithValue({
        message,
      });
    }
  },
);

const commentsSlice = createSlice({
  initialState,
  name: 'comments',
  reducers: {
    setHasMore(state: State, { payload }: PayloadAction<{ hasMore: boolean }>) {
      state.hasMore = payload.hasMore;
    },
  },
  extraReducers: (builder) => {
    // create a new comment
    builder.addCase(addComment.pending, (state: State) => {
      state.isCreating = true;
      state.isCreatingError = false;
    });
    builder.addCase(addComment.fulfilled, (state: State) => {
      state.isCreating = false;
    });
    builder.addCase(addComment.rejected, (state: State) => {
      state.isCreating = false;
      state.isCreatingError = true;
    });
    // get comments
    builder.addCase(getCommentsByDeviceId.pending, (state: State) => {
      state.hasMore = true;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCommentsByDeviceId.fulfilled, (state: State) => {
      state.isLoading = false;
    });
    builder.addCase(getCommentsByDeviceId.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
    // update comment
    builder.addCase(updateComment.pending, (state: State) => {
      state.isUpdating = true;
      state.isUpdatingError = false;
    });
    builder.addCase(updateComment.fulfilled, (state: State) => {
      state.isUpdating = false;
    });
    builder.addCase(updateComment.rejected, (state: State) => {
      state.isUpdating = false;
      state.isUpdatingError = true;
    });
    // delete comment
    builder.addCase(deleteComment.pending, (state: State) => {
      state.isDeleting = true;
      state.isDeletingError = false;
    });
    builder.addCase(deleteComment.fulfilled, (state: State) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteComment.rejected, (state: State) => {
      state.isDeleting = false;
      state.isDeletingError = true;
    });
  },
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
