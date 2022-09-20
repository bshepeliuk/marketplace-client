import React from 'react';
import styled from 'styled-components';
import CommentLoader from '../atoms/Loader/CommentLoader';

function CommentsListLoader() {
  return (
    <LoaderWrap className="custom-scrollbar">
      <CommentLoader />
      <CommentLoader />
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
  width: max-content;
  display: flex;
  flex-flow: column;
  gap: 15px;
  padding-right: 10px;
`;

export default CommentsListLoader;
