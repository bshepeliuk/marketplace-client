import React from 'react';
import useCommentsContext from '../hooks/useCommentsContext';
import { ShowMoreButton } from '../styles/comments.styled';

function LoadMoreButton() {
  const { isLoading, getMoreComments } = useCommentsContext();

  return (
    <div>
      <ShowMoreButton type="button" onClick={getMoreComments}>
        {isLoading ? 'Loading...' : 'show more comments'}
      </ShowMoreButton>
    </div>
  );
}

export default LoadMoreButton;
