import { RootState } from '@src/app/store';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IUpdateCommentParams } from '@src/common/types/apiTypes';
import { updateComment } from '../commentsSlice';

const useUpdateComment = () => {
  const dispatch = useAppDispatch();

  const selector = (state: RootState) => state.comments;
  const { isUpdating, isUpdatingError } = useTypedSelector(selector);

  const onUpdate = ({ body, commentId }: IUpdateCommentParams) => {
    return dispatch(updateComment({ body, commentId }));
  };

  return {
    onUpdate,
    isUpdating,
    isUpdatingError,
  };
};

export default useUpdateComment;
