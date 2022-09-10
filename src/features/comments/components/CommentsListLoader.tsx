import React from 'react';
import styled from 'styled-components';
import CommentLoader from '../atoms/CommentLoader';

function CommentsListLoader() {
  return (
    <LoaderWrap className="custom-scrollbar">
      <CommentLoader />
      <CommentLoader />
      <CommentLoader />
      <CommentLoader />
    </LoaderWrap>
  );
}

const LoaderWrap = styled.div`
  height: 600px;
  overflow: auto;
  width: 474px;
`;

export default CommentsListLoader;
