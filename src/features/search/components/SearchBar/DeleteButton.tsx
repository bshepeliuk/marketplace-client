import React from 'react';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import useSearchContext from '../../hooks/useSearchContext';

const Button = styled.button`
  position: absolute;
  right: 49px;
  border: none;
  background-color: transparent;
  font-size: 30px;
  color: #2f3542;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
`;

function DeleteButton() {
  const context = useSearchContext();

  if (!context.isVisible) return null;

  return (
    <Button id="clear-search" type="button" onClick={context.onClear}>
      <MdOutlineClose />
    </Button>
  );
}

export default DeleteButton;
