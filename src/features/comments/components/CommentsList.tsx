import React from 'react';
import { VariableSizeList as List } from 'react-window';
import CommentRow from './CommentRow';
import useCommentsContext from '../hooks/useCommentsContext';

function CommentsList() {
  const context = useCommentsContext();

  const { comments, listRef, getSize, isLoading, hasMore } = context;

  if (isLoading) return <div>Loading...</div>;

  const COMMENTS_COUNT = hasMore ? comments.length + 1 : comments.length;

  return (
    <List
      ref={listRef}
      height={400}
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
