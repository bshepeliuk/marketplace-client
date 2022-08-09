import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect, useRef, useState } from 'react';
import { getReplies } from '../commentsSlice';
import { repliesSelector } from '../selectors/commentsSelector';

const useGetRepliesByRootCommentId = (commentId: number) => {
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

  const fetchReplies = () => {
    setIsRepliesLoading(true);

    dispatch(getReplies({ commentId }));

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
