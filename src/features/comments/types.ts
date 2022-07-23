import { IAddCommentParams } from '@src/common/types/apiTypes';
import { DeviceEntities } from '../devices/types';

export interface IComment {
  id: number;
  body: string;
  fullName: string;
  parentId: number | null;
  deviceId: number;
  createdAt: Date;
  updateAt: Date;
}

export interface INewCommentEntity {
  result: number;
  entities: Pick<DeviceEntities, 'comments' | 'devices'>;
}

export type OnAddCommentType = Pick<IAddCommentParams, 'body' | 'parentId'>;
