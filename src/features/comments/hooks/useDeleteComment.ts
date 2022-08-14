import { RootState } from '@src/app/store';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IUpdateCommentParams } from '@src/common/types/apiTypes';
import { deleteComment } from '../commentsSlice';

const useDeleteComment = () => {
  const dispatch = useAppDispatch();

  const selector = (state: RootState) => state.comments;
  const { isDeleting, isDeletingError } = useTypedSelector(selector);

  const onDelete = ({ commentId }: Pick<IUpdateCommentParams, 'commentId'>) => {
    return dispatch(deleteComment({ commentId }));
  };

  return {
    onDelete,
    isDeleting,
    isDeletingError,
  };
};

export default useDeleteComment;
