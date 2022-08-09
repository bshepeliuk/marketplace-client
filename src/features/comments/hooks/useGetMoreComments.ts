import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getCommentsByDeviceId } from '../commentsSlice';

const useGetMoreComments = () => {
  const dispatch = useAppDispatch();
  const { hasMore } = useTypedSelector((state) => state.comments);

  const getMoreByDeviceId = (deviceId: number) => {
    return dispatch(getCommentsByDeviceId({ deviceId }));
  };

  return {
    getMoreByDeviceId,
    hasMore,
  };
};

export default useGetMoreComments;
