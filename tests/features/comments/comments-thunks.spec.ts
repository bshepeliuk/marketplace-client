/* eslint-disable max-len */
import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import thunk from 'redux-thunk';
import { normalize } from 'normalizr';

import {
  addComment,
  commentsActions,
  deleteComment,
  getCommentsByDeviceId,
  getReplies,
  updateComment,
} from '@src/features/comments/commentsSlice';
import { incrementCommentRepliesCount } from '@features/entities/entitiesReducer';
import updateCommentIdsForDevice from '@features/comments/helpers/updateCommentIdsForDevice';
import { BASE_API_URL } from '@src/common/constants';
import { DeviceEntities, IDevice } from '@src/features/devices/types';
import {
  CommentSchema,
  CommentsSchema,
  DeviceSchema,
} from '@src/common/normalizeSchemas';
import { IComment } from '@src/features/comments/types';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import { rootStateMock } from '../../mocks/stateMock';
import { commentMock, deviceMock } from '../../mocks/data';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('[THUNKS]: Comments', () => {
  let store: any;

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => server.close());

  beforeEach(() => {
    store = mockStore(rootStateMock);
  });

  describe('create a new comment', () => {
    test('should increment number of replies for root comment.', async () => {
      const commentResponse = {
        id: 1234,
        body: 'comment!',
        deviceId: 1,
        parentId: commentMock.id,
      };

      server.use(
        rest.post(`${BASE_API_URL}/comments`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ comment: commentResponse }));
        }),
      );

      await store.dispatch(
        addComment({
          deviceId: deviceMock.id,
          parentId: commentMock.id,
          body: 'comment!',
        }),
      );

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(commentResponse, CommentSchema);

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId: deviceMock.id,
        devices: rootStateMock.entities.devices,
        ids: [result],
      });

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: addComment.pending.type,
          payload: undefined,
        },
        {
          type: incrementCommentRepliesCount.type,
          payload: {
            commentId: commentMock.id,
          },
        },
        {
          type: addComment.fulfilled.type,
          payload: {
            result,
            entities: {
              ...entities,
              devices: nextDeviceState,
            },
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should add a new comment successfully.', async () => {
      const commentResponse = {
        id: 1234,
        body: 'comment!',
        deviceId: 1,
        parentId: null,
      };

      server.use(
        rest.post(`${BASE_API_URL}/comments`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ comment: commentResponse }));
        }),
      );

      await store.dispatch(
        addComment({
          deviceId: deviceMock.id,
          parentId: null,
          body: 'comment!',
        }),
      );

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(commentResponse, CommentSchema);

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId: deviceMock.id,
        devices: rootStateMock.entities.devices,
        ids: [result],
      });

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: addComment.pending.type,
          payload: undefined,
        },
        {
          type: addComment.fulfilled.type,
          payload: {
            result,
            entities: {
              ...entities,
              devices: nextDeviceState,
            },
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when comment was not added.', async () => {
      const error = {
        message: '[Comments API]: Something went wrong!',
      };

      server.use(
        rest.post(`${BASE_API_URL}/comments`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: error.message }));
        }),
      );

      await store.dispatch(
        addComment({
          deviceId: deviceMock.id,
          parentId: null,
          body: 'comment!',
        }),
      );

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: addComment.pending.type,
          payload: undefined,
        },
        {
          type: addComment.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('get comments by deviceId', () => {
    test('should fetch comments successfully', async () => {
      const commentsResponse = [
        {
          id: 1234,
          body: 'comment!',
          deviceId: deviceMock.id,
          parentId: null,
        },
      ];

      server.use(
        rest.get(
          `${BASE_API_URL}/comments/${deviceMock.id}`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({ comments: commentsResponse }),
            );
          },
        ),
      );

      await store.dispatch(
        getCommentsByDeviceId({
          deviceId: deviceMock.id,
        }),
      );

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number[]
      >(commentsResponse, CommentsSchema);

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId: deviceMock.id,
        devices: rootStateMock.entities.devices,
        ids: result,
      });

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getCommentsByDeviceId.pending.type,
          payload: undefined,
        },
        {
          type: commentsActions.setHasMore.type,
          payload: {
            hasMore: false,
          },
        },
        {
          type: getCommentsByDeviceId.fulfilled.type,
          payload: {
            result,
            entities: {
              ...entities,
              devices: nextDeviceState,
            },
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when comments were not fetched successfully.', async () => {
      const error = {
        message: '[GET Comments]: Something went wrong!',
      };

      server.use(
        rest.get(
          `${BASE_API_URL}/comments/${deviceMock.id}`,
          (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: error.message }));
          },
        ),
      );

      await store.dispatch(
        getCommentsByDeviceId({
          deviceId: deviceMock.id,
        }),
      );

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getCommentsByDeviceId.pending.type,
          payload: undefined,
        },
        {
          type: getCommentsByDeviceId.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('get replies by root comment id', () => {
    test('should get replies successfully.', async () => {
      const repliesResponse = [
        {
          id: 2000,
          body: 'reply!',
          deviceId: deviceMock.id,
          parentId: commentMock.id,
        },
      ];

      server.use(
        rest.get(
          `${BASE_API_URL}/replies/${commentMock.id}`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ replies: repliesResponse }));
          },
        ),
      );

      await store.dispatch(
        getReplies({
          commentId: commentMock.id,
        }),
      );

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number[]
      >(repliesResponse, CommentsSchema);

      const nextDeviceState = updateCommentIdsForDevice({
        deviceId: deviceMock.id,
        devices: rootStateMock.entities.devices,
        ids: result,
      });

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getReplies.pending.type,
          payload: undefined,
        },
        {
          type: getReplies.fulfilled.type,
          payload: {
            result,
            entities: {
              ...entities,
              devices: nextDeviceState,
            },
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when replies were not fetched.', async () => {
      const error = {
        message: '[Replies GET]: Something went wrong!',
      };

      server.use(
        rest.get(
          `${BASE_API_URL}/replies/${commentMock.id}`,
          (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: error.message }));
          },
        ),
      );

      await store.dispatch(
        getReplies({
          commentId: commentMock.id,
        }),
      );

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getReplies.pending.type,
          payload: undefined,
        },
        {
          type: getReplies.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('update comment', () => {
    test('should update comment successfully', async () => {
      const commentResponse = {
        ...deviceMock,
        body: 'updated comment!',
      };

      server.use(
        rest.patch(`${BASE_API_URL}/comments`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ comment: commentResponse }));
        }),
      );

      await store.dispatch(
        updateComment({
          commentId: commentMock.id,
          body: '',
        }),
      );

      const { result, entities } = normalize<
        IComment,
        Pick<DeviceEntities, 'comments'>,
        number
      >(commentResponse, CommentSchema);

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: updateComment.pending.type,
          payload: undefined,
        },
        {
          type: updateComment.fulfilled.type,
          payload: { result, entities },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when comment was not updated', async () => {
      const error = {
        message: '[Comment PATCH]: Something went wrong!',
      };

      server.use(
        rest.patch(`${BASE_API_URL}/comments`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: error.message }));
        }),
      );

      await store.dispatch(
        updateComment({
          commentId: commentMock.id,
          body: '',
        }),
      );

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: updateComment.pending.type,
          payload: undefined,
        },
        {
          type: updateComment.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('delete comment', () => {
    test('should delete comment successfully.', async () => {
      server.use(
        rest.delete(
          `${BASE_API_URL}/comments/${commentMock.id}`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ message: 'Deleted!' }));
          },
        ),
      );

      await store.dispatch(
        deleteComment({
          commentId: commentMock.id,
        }),
      );

      const prevDevice = rootStateMock.entities.devices[commentMock.deviceId];

      const updatedDevice = {
        ...prevDevice,
        comments: (prevDevice.comments as number[]).filter(
          (commentId) => commentId !== commentMock.id,
        ),
      };

      const { result, entities } = normalize<IDevice, DeviceEntities, number>(
        updatedDevice,
        DeviceSchema,
      );

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: deleteComment.pending.type,
          payload: undefined,
        },
        {
          type: deleteComment.fulfilled.type,
          payload: { result, entities },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error when comment was not deleted.', async () => {
      const error = {
        message: '[Comment DELETE]: Something went wrong!',
      };

      server.use(
        rest.delete(
          `${BASE_API_URL}/comments/${commentMock.id}`,
          (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: error.message }));
          },
        ),
      );

      await store.dispatch(
        deleteComment({
          commentId: commentMock.id,
        }),
      );

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: deleteComment.pending.type,
          payload: undefined,
        },
        {
          type: deleteComment.rejected.type,
          payload: {
            message: error.message,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
