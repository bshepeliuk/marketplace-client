import React from 'react';
import useGetRepliesByRootCommentId from '../hooks/useGetReplies';
import CommentView from './CommentView';
import {
  LoadMoreWrap,
  ShowRepliesButton,
  ReplyList,
} from '../styles/comments.styled';
import { REPLIES_OFFSET } from '../constants';

interface IRepliesProps {
  repliesCount: number;
  rootCommentId: number;
}

function ReplyListView({ repliesCount, rootCommentId }: IRepliesProps) {
  // prettier-ignore
  const {
    fetchReplies,
    replies,
    isRepliesLoading
  } = useGetRepliesByRootCommentId(rootCommentId);

  const hasRepliesCount = repliesCount > 0;
  const hasMoreReplies = repliesCount > replies.length;
  const hasReplies = hasRepliesCount && hasMoreReplies;

  const count =
    repliesCount < REPLIES_OFFSET
      ? repliesCount
      : repliesCount - replies.length;

  const replyBtnContent = isRepliesLoading ? 'Loading...' : `${count} replies`;

  return (
    <>
      {replies.length > 0 && (
        <ReplyList>
          {replies.map((item) => (
            <CommentView key={`reply-${item.id}`} comment={item} />
          ))}
        </ReplyList>
      )}

      {hasReplies && (
        <LoadMoreWrap>
          <ShowRepliesButton type="button" onClick={fetchReplies}>
            {replyBtnContent}
          </ShowRepliesButton>
        </LoadMoreWrap>
      )}
    </>
  );
}

export default ReplyListView;
