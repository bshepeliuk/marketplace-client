import React, { useRef } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IComment } from '../types';
import CommentView from './CommentView';
import useCommentsContext from '../hooks/useCommentsContext';
import ReplyListView from './ReplyListView';
import { Row } from '../styles/comments.styled';
import useDynamicCommentRowHeight from '../hooks/useDynamicCommentRowHeight';
import { repliesSelector } from '../selectors/commentsSelector';
import LoadMoreButton from '../atoms/LoadMoreButton';

interface IData {
  comments: IComment[];
}

interface IRowProps {
  data: IData;
  index: number;
}

function CommentRow({ data, index }: IRowProps) {
  const comment = data.comments[index];

  const rowRef = useRef<HTMLDivElement>(null);
  const { hasMore, checkAreRepliesVisible } = useCommentsContext();
  const { replies } = useTypedSelector((state) => {
    return repliesSelector(state, comment?.id);
  });

  useDynamicCommentRowHeight({
    rowRef,
    rowIndex: index,
  });

  const hasLoadMoreButton = comment === undefined && hasMore;
  const isRepliesVisible = checkAreRepliesVisible(comment?.id);
  const hasReplies = replies.length > 0;

  if (hasLoadMoreButton) return <LoadMoreButton />;

  return (
    <Row ref={rowRef}>
      <CommentView key={comment.id} comment={comment} hasReplies={hasReplies} />

      <ReplyListView
        isRepliesVisible={isRepliesVisible}
        rootCommentId={comment.id}
        repliesCount={comment.repliesCount}
      />
    </Row>
  );
}

export default CommentRow;
