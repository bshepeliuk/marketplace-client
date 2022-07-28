import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useState } from 'react';
import { getReplies } from '../commentsSlice';
import { REPLIES_LIMIT } from '../constants';
import { repliesSelector } from '../selectors/commentsSelector';

const useGetRepliesByRootCommentId = (commentId: number) => {
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { replies } = useTypedSelector((state) => {
    return repliesSelector(state, commentId);
  });

  const fetchReplies = () => {
    setIsRepliesLoading(true);

    const OFFSET = replies.length > 0 ? replies.length : 0;

    dispatch(getReplies({ commentId, offset: OFFSET, limit: REPLIES_LIMIT }))
      .then((action) => {
        if (!getReplies.fulfilled.match(action)) return action;
      })
      .finally(() => {
        setIsRepliesLoading(false);
      });
  };

  return {
    isRepliesLoading,
    fetchReplies,
    replies,
  };
};

export default useGetRepliesByRootCommentId;
