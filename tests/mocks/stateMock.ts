import { ROLES } from '@src/common/constants';
import { CommentSchema, DeviceSchema } from '@src/common/normalizeSchemas';
import { IComment } from '@src/features/comments/types';
import { DeviceEntities, IDevice } from '@src/features/devices/types';
import { normalize } from 'normalizr';
import { commentMock, deviceMock, replyMock } from './data';

const deviceEntityMock = normalize<IDevice, DeviceEntities, number>(
  deviceMock,
  DeviceSchema,
);

const commentEntityMock = normalize<
  IComment,
  Pick<DeviceEntities, 'comments'>,
  number
>(commentMock, CommentSchema);

const replyEntityMock = normalize<
  IComment,
  Pick<DeviceEntities, 'comments'>,
  number
>(replyMock, CommentSchema);

export const rootStateMock = {
  entities: {
    devices: deviceEntityMock.entities.devices,
    comments: {
      ...commentEntityMock.entities.comments,
      ...replyEntityMock.entities.comments,
    },
    images: {},
    categories: {},
  },
  auth: {
    isLoggedIn: true,
    user: {
      id: 1,
      fullName: 'John Wick',
      role: ROLES.BUYER,
    },
  },
  categories: {
    items: [],
    isError: false,
    isLoading: false,
  },
  devices: {
    isLoading: false,
    items: [deviceEntityMock.result],
    device: {
      isLoading: false,
    },
  },
  cart: {
    items: [],
  },
  comments: {
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
  },
};
