import { VariableSizeList } from 'react-window';
import { useParams } from 'react-router-dom';
import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  IAddCommentParams,
  IUpdateCommentParams,
} from '@src/common/types/apiTypes';
import useAddComment from '../hooks/useAddComment';
import useDeleteComment from '../hooks/useDeleteComment';
import useUpdateComment from '../hooks/useUpdateComment';
import useWindowResize from '../hooks/useWindowResize';
import { IComment, IDeleteCommentParams } from '../types';
import useGetCommentsByDeviceId from '../hooks/useGetComments';
import useGetMoreComments from '../hooks/useGetCommentsByRequest';

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  listRef: MutableRefObject<VariableSizeList | null>;
  windowWidth: number;
  activeComment: ActiveCommentType;
  comments: IComment[];
  isLoading: boolean;
  setActiveComment: Dispatch<SetStateAction<ActiveCommentType>>;
  clearActiveComment: () => void;
  setSize: (index: number, size: number) => void;
  getSize: (index: number) => number;
  onAddComment: ({ parentId, body, deviceId }: IAddCommentParams) => void;
  onEditComment: ({ body, commentId }: IUpdateCommentParams) => void;
  onDeleteComment: ({ commentId }: IDeleteCommentParams) => void;
  hasMore: boolean;
  getMoreComments: () => void;
}

type ActiveCommentType = {
  id: number;
  type: 'replying' | 'editing';
} | null;

interface ISizeMap {
  [index: number]: number;
}

export const CommentsContext = createContext<IContext | undefined>(undefined);

export function CommentsProvider({ children }: IProps) {
  const { deviceId } = useParams();
  const [activeComment, setActiveComment] = useState<ActiveCommentType>(null);
  const listRef = useRef<VariableSizeList | null>(null);
  const sizeMap = useRef<ISizeMap>({});

  const { isLoading, comments } = useGetCommentsByDeviceId(Number(deviceId));
  const { getMoreByDeviceId, hasMore } = useGetMoreComments();
  const [windowWidth] = useWindowResize();
  const { onAdd } = useAddComment();
  const { onUpdate } = useUpdateComment();
  const { onDelete } = useDeleteComment();

  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current?.resetAfterIndex(index);
  }, []);

  const getSize = (index: number) => sizeMap.current[index] || 50;

  const clearActiveComment = () => {
    setActiveComment(null);
  };

  const onAddComment = (params: IAddCommentParams) => {
    onAdd(params).then(() => {
      clearActiveComment();
    });
  };

  const onEditComment = ({ body, commentId }: IUpdateCommentParams) => {
    onUpdate({ body, commentId }).then(() => {
      clearActiveComment();
    });
  };

  const onDeleteComment = ({ commentId }: IDeleteCommentParams) => {
    onDelete({ commentId }).then(() => {
      clearActiveComment();
    });
  };

  const getMoreComments = () => {
    if (deviceId !== undefined) {
      getMoreByDeviceId(Number(deviceId)).then(() => {
        listRef.current?.scrollToItem(comments.length);
      });
    }
  };

  const values = {
    activeComment,
    setActiveComment,
    clearActiveComment,
    onAddComment,
    onEditComment,
    onDeleteComment,
    setSize,
    getSize,
    windowWidth,
    listRef,
    isLoading,
    comments,
    hasMore,
    getMoreComments,
  };

  return (
    <CommentsContext.Provider value={values}>
      {children}
    </CommentsContext.Provider>
  );
}
