import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { updateCommentIdsForDevice } from '@src/features/entities/entitiesReducer';
import { addComment } from '../commentsSlice';

interface IAddProps {
  body: string;
  deviceId: number;
  parentId: number | null;
}

const useAddComment = () => {
  const dispatch = useAppDispatch();
  const { isCreating, isCreatingError } = useTypedSelector(
    (state) => state.comments,
  );

  const onAdd = async ({ body, deviceId, parentId }: IAddProps) => {
    const action = await dispatch(addComment({ body, deviceId, parentId }));

    if (addComment.fulfilled.match(action)) {
      dispatch(
        updateCommentIdsForDevice({ deviceId, ids: [action.payload.result] }),
      );
    }
  };

  return {
    onAdd,
    isCreating,
    isCreatingError,
  };
};

export default useAddComment;
