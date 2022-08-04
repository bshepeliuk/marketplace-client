import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { updateCommentIdsForDevice } from '@src/features/entities/entitiesReducer';
import { getCommentsByDeviceId } from '../commentsSlice';
import { commentsSelector } from '../selectors/commentsSelector';

const useGetCommentsByDeviceId = (deviceId: number) => {
  const dispatch = useAppDispatch();
  const { comments, isLoading, isError } = useTypedSelector((state) => {
    return commentsSelector(state, deviceId);
  });

  const hasComments = comments.length > 0;

  const getComments = async () => {
    if (hasComments) return;

    const action = await dispatch(getCommentsByDeviceId({ deviceId }));

    if (getCommentsByDeviceId.fulfilled.match(action)) {
      dispatch(
        updateCommentIdsForDevice({ deviceId, ids: action.payload.result }),
      );
    }
  };

  useEffect(() => {
    getComments();
  }, [deviceId]);

  return {
    comments,
    isLoading,
    isError,
  };
};

export default useGetCommentsByDeviceId;
