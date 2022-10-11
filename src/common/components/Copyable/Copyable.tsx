import React from 'react';
import useCopy from '@src/common/hooks/useCopy';
import { BiCopy } from 'react-icons/bi';
import styled from 'styled-components';
import { MdOutlineLibraryAddCheck } from 'react-icons/md';

interface IProps {
  value: string | number;
}

function Copyable({ value }: IProps) {
  const { isCopied, onCopy } = useCopy();

  const handleCopy = () => onCopy(value);

  return (
    <>
      {value}
      <CopyButton type="button" isCopied={isCopied} onClick={handleCopy}>
        {isCopied ? <MdOutlineLibraryAddCheck /> : <BiCopy />}
      </CopyButton>
    </>
  );
}

const CopyButton = styled.button<{ isCopied: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 15px;
  transition: color 0.4s ease-out;
  color: ${(props) => (props.isCopied ? '#1abc9c' : '#9adcff')};

  &:hover {
    color: #3498db;
  }
`;

export default Copyable;
