import React from 'react';
import styled from 'styled-components';
import useCommentsContext from '../hooks/useCommentsContext';

interface IProps {
  commentId: number;
}

function RepliesVisibilityButton({ commentId }: IProps) {
  // prettier-ignore
  const { toggleRepliesVisibility, checkIsRepliesVisible } = useCommentsContext();

  const isRepliesVisible = checkIsRepliesVisible(commentId);

  return (
    <Wrap>
      <Button type="button" onClick={() => toggleRepliesVisibility(commentId)}>
        {isRepliesVisible ? 'expand all' : 'collapse all'}
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 310px;
`;

const Button = styled.button`
  background-color: rgba(199, 236, 238, 0.5);
  border-radius: 50px;
  padding: 2px 30px;
  color: rgba(34, 166, 179, 0.9);
  border: none;
`;

export default RepliesVisibilityButton;
