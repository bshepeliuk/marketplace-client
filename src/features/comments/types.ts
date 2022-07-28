import {
  IAddCommentParams,
  IUpdateCommentParams,
} from '@src/common/types/apiTypes';
import { DeviceEntities } from '../devices/types';

export interface IComment {
  id: number;
  body: string;
  fullName: string;
  parentId: number | null;
  deviceId: number;
  repliesCount: number;
  createdAt: Date;
  updateAt: Date;
}

export interface INewCommentEntity {
  result: number;
  entities: Pick<DeviceEntities, 'comments' | 'devices'>;
}

export interface ICommentEntities {
  result: number[];
  entities: Pick<DeviceEntities, 'comments'>;
}

export interface IUpdateCommentEntity {
  result: number;
  entities: Pick<DeviceEntities, 'comments'>;
}

export type IDeleteCommentParams = Pick<IUpdateCommentParams, 'commentId'>;

export type OnAddCommentType = Pick<IAddCommentParams, 'body' | 'parentId'>;
