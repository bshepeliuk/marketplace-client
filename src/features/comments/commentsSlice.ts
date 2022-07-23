import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IAddCommentParams } from '@src/common/types/apiTypes';
import { CommentSchema } from '@src/common/normalizeSchemas';
import { IComment, INewCommentEntity } from './types';
import { DeviceEntities, IDevice } from '../devices/types';

export const initialState = {
  isError: false,
  isLoading: false,
  isCreating: false,
  isCreatingError: false,
  items: [] as number[],
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
  unknown, // TODO: update types
  { deviceId: number },
  IThunkAPI
>('comments/fetch-by-deviceId', async ({ deviceId }, { rejectWithValue }) => {
  try {
    const { data } = await Api.Comments.getByDeviceId(deviceId);

    return {
      comments: data.comments,
    };
  } catch (error) {
    const message = getErrorMessage(error);

    return rejectWithValue({
      message,
    });
  }
});

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
  },
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
