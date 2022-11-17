import React from 'react';
import styled from 'styled-components';
import useCommentsContext from '../hooks/useCommentsContext';

interface IProps {
  commentId: number;
}

function RepliesVisibilityButton({ commentId }: IProps) {
  const { toggleRepliesVisibility, checkAreRepliesVisible } = useCommentsContext();

  const isRepliesVisible = checkAreRepliesVisible(commentId);

  return (
    <Wrap>
      <Button type="button" onClick={() => toggleRepliesVisibility(commentId)}>
        {isRepliesVisible ? 'expand all' : 'collapse all'}
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-top: 8px;
  grid-area: COLLAPSE-BTN;

  @media (max-width: 500px) {
    width: 230px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: rgba(199, 236, 238, 0.5);
  border-radius: 50px;
  padding: 2px 30px;
  color: rgba(34, 166, 179, 0.9);
  border: none;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: rgba(199, 236, 238, 0.2);
  }
`;

export default RepliesVisibilityButton;
