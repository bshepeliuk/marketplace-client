import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
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

  const onAdd = ({ body, deviceId, parentId }: IAddProps) => {
    return dispatch(addComment({ body, deviceId, parentId }));
  };

  return {
    onAdd,
    isCreating,
    isCreatingError,
  };
};

export default useAddComment;
