import React from 'react';
import { VariableSizeList as List } from 'react-window';
import CommentRow from './CommentRow';
import useCommentsContext from '../hooks/useCommentsContext';

function CommentsList() {
  const { comments, listRef, getSize, isLoading } = useCommentsContext();

  if (isLoading) return <div>Loading...</div>;

  return (
    <List
      ref={listRef}
      height={400}
      width="100%"
      itemCount={comments.length}
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
