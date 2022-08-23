import { ROLES } from '@src/common/constants';
import {
  categoriesEntityMock,
  commentEntityMock,
  deviceEntityMock,
  replyEntityMock,
} from './entitiesMock';

export const rootStateMock = {
  entities: {
    devices: deviceEntityMock.entities.devices,
    comments: {
      ...commentEntityMock.entities.comments,
      ...replyEntityMock.entities.comments,
    },
    categories: categoriesEntityMock.entities.categories,
    images: {},
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
    items: categoriesEntityMock.result,
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
