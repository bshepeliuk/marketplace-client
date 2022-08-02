import React from 'react';
import { VariableSizeList as List } from 'react-window';
import CommentRow from './CommentRow';
import useCommentsContext from '../hooks/useCommentsContext';

function CommentsList() {
  const context = useCommentsContext();

  const { comments, listRef, getSize, isLoading, hasMore } = context;

  const COMMENTS_COUNT = hasMore ? comments.length + 1 : comments.length;

  if (isLoading) return <div>Loading...</div>;

  return (
    <List
      ref={listRef}
      height={500}
      width="100%"
      className="custom-scrollbar"
      itemCount={COMMENTS_COUNT}
      itemSize={getSize}
      itemData={{ comments }}
    >
      {({ data, index, style }) => (
        <div style={style}>
          <CommentRow data={data} index={index} />
        </div>
      )}
    </List>
  );
}

export default CommentsList;
