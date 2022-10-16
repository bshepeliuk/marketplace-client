import { comparisonItemsMock, comparisonTableMock, ordersMock, userMock } from './data';
import { categoriesEntityMock, commentEntityMock, deviceEntityMock, replyEntityMock } from './entitiesMock';

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
    stripeAccount: null,
    user: userMock,
    login: {
      isLoading: false,
      isError: false,
      error: null,
    },
    register: {
      isLoading: false,
      isError: false,
      error: null,
    },
    logout: {
      isLoading: false,
      isError: false,
      error: null,
    },
  },
  categories: {
    items: categoriesEntityMock.result,
    isError: false,
    isLoading: false,
  },
  devices: {
    total: 22,
    isLoading: false,
    items: [deviceEntityMock.result],
    device: {
      isLoading: false,
    },
  },
  cart: {
    items: [],
  },
  comparison: {
    items: comparisonItemsMock,
    table: {
      header: comparisonTableMock.header,
      body: comparisonTableMock.body,
    },
  },
  filters: {
    options: {
      isError: false,
      isLoading: false,
      items: [],
      prices: {},
    },
  },
  orders: {
    isLoading: false,
    isError: false,
    error: null,
    total: null,
    items: ordersMock,
  },
  purchases: {
    isLoading: false,
    isError: false,
    error: null,
    total: null,
    items: ordersMock,
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
