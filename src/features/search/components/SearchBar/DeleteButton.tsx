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
  color: rgba(131, 149, 167, 1);
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  transition: color 0.3s ease-out;

  &:hover {
    color: rgba(87, 101, 116, 1);
  }
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
