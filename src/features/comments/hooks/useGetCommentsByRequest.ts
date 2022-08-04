import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { updateCommentIdsForDevice } from '@src/features/entities/entitiesReducer';
import { getCommentsByDeviceId } from '../commentsSlice';

const useGetMoreComments = () => {
  const dispatch = useAppDispatch();
  const { hasMore } = useTypedSelector((state) => state.comments);

  const getMoreByDeviceId = async (deviceId: number) => {
    const action = await dispatch(getCommentsByDeviceId({ deviceId }));

    if (getCommentsByDeviceId.fulfilled.match(action)) {
      dispatch(
        updateCommentIdsForDevice({ deviceId, ids: action.payload.result }),
      );
    }
  };

  return {
    getMoreByDeviceId,
    hasMore,
  };
};

export default useGetMoreComments;
