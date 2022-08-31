import { CategoriesSchema, CommentSchema, DeviceSchema } from '@src/common/normalizeSchemas';
import { IComment } from '@src/features/comments/types';
import { DeviceEntities, IDevice } from '@src/features/devices/types';
import { normalize } from 'normalizr';
import { categories, commentMock, deviceMock, replyMock } from './data';

export const deviceEntityMock = normalize<IDevice, DeviceEntities, number>(deviceMock, DeviceSchema);

export const commentEntityMock = normalize<IComment, Pick<DeviceEntities, 'comments'>, number>(
  commentMock,
  CommentSchema,
);

export const replyEntityMock = normalize<IComment, Pick<DeviceEntities, 'comments'>, number>(replyMock, CommentSchema);

export const categoriesEntityMock = normalize(categories, CategoriesSchema);
