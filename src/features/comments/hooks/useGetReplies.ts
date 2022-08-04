import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { updateCommentIdsForDevice } from '@src/features/entities/entitiesReducer';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReplies } from '../commentsSlice';
import { repliesSelector } from '../selectors/commentsSelector';

const useGetRepliesByRootCommentId = (commentId: number) => {
  const { deviceId } = useParams();
  const ignore = useRef(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { replies } = useTypedSelector((state) => {
    return repliesSelector(state, commentId);
  });

  useEffect(() => {
    ignore.current = false;

    return () => {
      ignore.current = true;
    };
  }, [commentId]);

  const fetchReplies = async () => {
    setIsRepliesLoading(true);

    const action = await dispatch(getReplies({ commentId }));

    if (getReplies.fulfilled.match(action)) {
      dispatch(
        updateCommentIdsForDevice({
          deviceId: Number(deviceId),
          ids: action.payload.result,
        }),
      );
    }

    if (!ignore.current) {
      setIsRepliesLoading(false);
    }
  };

  return {
    isRepliesLoading,
    fetchReplies,
    replies,
  };
};

export default useGetRepliesByRootCommentId;
