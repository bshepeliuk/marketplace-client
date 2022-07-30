import React, { useEffect, useRef } from 'react';
import { IComment } from '../types';
import CommentView from './CommentView';
import useCommentsContext from '../hooks/useCommentsContext';
import ReplyListView from './ReplyListView';

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
    <div ref={rowRef} style={{ paddingBottom: 20 }}>
      <CommentView key={comment.id} comment={comment} />

      <ReplyListView
        rootCommentId={comment.id}
        repliesCount={comment.repliesCount}
      />
    </div>
  );
}

export default CommentRow;
