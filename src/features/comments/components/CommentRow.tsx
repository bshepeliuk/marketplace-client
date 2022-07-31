import React, { useEffect, useRef } from 'react';
import { IComment } from '../types';
import CommentView from './CommentView';
import useCommentsContext from '../hooks/useCommentsContext';
import ReplyListView from './ReplyListView';
import { Row } from '../styles/comments.styled';

interface IData {
  comments: IComment[];
}

interface IRowProps {
  data: IData;
  index: number;
}

function CommentRow({ data, index }: IRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { setSize, windowWidth } = useCommentsContext();

  const comment = data.comments[index];

  useEffect(() => {
    let ignore = false;

    if (rowRef.current === null) return;

    if (!ignore) {
      setSize(index, rowRef.current.getBoundingClientRect().height);
    }

    return () => {
      ignore = true;
    };
  }, [setSize, index, windowWidth]);

  return (
    <Row ref={rowRef}>
      <CommentView key={comment.id} comment={comment} />

      <ReplyListView
        rootCommentId={comment.id}
        repliesCount={comment.repliesCount}
      />
    </Row>
  );
}

export default CommentRow;
