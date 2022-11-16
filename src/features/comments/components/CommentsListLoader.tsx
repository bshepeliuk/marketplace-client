import React from 'react';
import styled from 'styled-components';
import CommentLoader from '../atoms/Loader/CommentLoader';

function CommentsListLoader() {
  return (
    <Container>
      <LoaderWrap className="custom-scrollbar">
        <CommentLoader />
        <CommentLoader />
        <CommentLoader />
        <CommentLoader />
        <CommentLoader />
        <CommentLoader />
      </LoaderWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
`;

const LoaderWrap = styled.div`
  height: 600px;
  overflow: auto;
  width: max-content;
  display: flex;
  flex-flow: column;
  gap: 15px;
  padding-right: 10px;
  background-color: #fff;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(236, 240, 241, 0.01);
  }

  &::-webkit-scrollbar-track:hover {
    background-color: rgba(236, 240, 241, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &::-webkit-scrollbar-thumb:hover {
    display: block;
    background-color: rgba(52, 73, 94, 0.1);
  }
`;

export default CommentsListLoader;
