import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
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
import { repliesSelector } from './selectors/commentsSelector';

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
};

type State = typeof initialState;

export const addComment = createAsyncThunk<
  INewCommentEntity,
  IAddCommentParams,
  IThunkAPI
>(
  'comments/create',
  async ({ deviceId, parentId, body }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await Api.Comments.add({
        deviceId,
        parentId,
        body,
      });

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(data.comment, CommentSchema);

      const deviceEntity = state.entities.devices[deviceId];

      const devices = {
        [deviceEntity.id]: {
          ...deviceEntity,
          comments: [...deviceEntity.comments, result],
        },
      } as Record<string, IDevice>;

      return {
        result,
        entities: {
          ...entities,
          devices,
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

export const getCommentsByDeviceId = createAsyncThunk<
  ICommentEntities,
  { deviceId: number },
  IThunkAPI
>(
  'comments/fetch-by-deviceId',
  async ({ deviceId }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const { data } = await Api.Comments.getByDeviceId(deviceId);

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number[]
      >(data.comments, CommentsSchema);

      const device = state.entities.devices[deviceId];
      const prevComments = (device.comments as Array<number>) ?? [];

      return {
        result,
        entities: {
          ...entities,
          devices: {
            ...state.entities.devices,
            [deviceId]: {
              ...device,
              comments: prevComments.concat(result),
            },
          },
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

    const rootComment = state.entities.comments[commentId];
    const deviceEntity = state.entities.devices[rootComment.deviceId];

    const { replies } = repliesSelector(state, commentId);

    const offset = replies.length ?? 0;

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

      const comments = [
        ...new Set((deviceEntity.comments as Array<number>).concat(result)),
      ];

      return {
        result,
        entities: {
          ...entities,
          devices: {
            ...state.entities.devices,
            [deviceEntity.id]: {
              ...deviceEntity,
              comments,
            },
          },
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

    try {
      const { data } = await Api.Comments.updateByCommentId({
        commentId,
        body,
      });

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(data.comment, CommentSchema);

      return {
        result,
        entities: {
          comments: {
            ...state.entities.comments,
            ...entities.comments,
          },
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

export const deleteComment = createAsyncThunk<
  IDeviceEntityData,
  Pick<IUpdateCommentParams, 'commentId'>,
  IThunkAPI
>(
  'comments/delete-by-commentId',
  async ({ commentId }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      await Api.Comments.deleteById(commentId);

      const comment = state.entities.comments[commentId];
      const device = state.entities.devices[comment.deviceId];

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

      return rejectWithValue({
        message,
      });
    }
  },
);

const commentsSlice = createSlice({
  initialState,
  name: 'comments',
  reducers: {},
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
