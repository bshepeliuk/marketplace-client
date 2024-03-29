import React from 'react';
import useGetRepliesByRootCommentId from '../hooks/useGetReplies';
import CommentView from './CommentView';
import { LoadMoreWrap, ShowRepliesButton, ReplyList } from '../styles/comments.styled';

interface IRepliesProps {
  repliesCount: number;
  rootCommentId: number;
  isRepliesVisible: boolean;
}

function ReplyListView({ repliesCount, rootCommentId, isRepliesVisible }: IRepliesProps) {
  const { fetchReplies, replies, isRepliesLoading } = useGetRepliesByRootCommentId(rootCommentId);

  const hasRepliesCount = repliesCount > 0;
  const hasMoreReplies = repliesCount > replies.length;
  const hasReplies = hasRepliesCount && hasMoreReplies;
  const hasVisibleReplies = replies.length > 0 && !isRepliesVisible;
  const hasLoadMoreRepliesBtn = hasReplies && !isRepliesVisible;

  const count = repliesCount - replies.length;

  const replyBtnContent = isRepliesLoading ? 'Loading...' : `${count} replies`;

  return (
    <>
      {hasVisibleReplies && (
        <ReplyList>
          {replies.map((item) => (
            <CommentView key={`reply-${item.id}`} comment={item} />
          ))}
        </ReplyList>
      )}

      {hasLoadMoreRepliesBtn && (
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
