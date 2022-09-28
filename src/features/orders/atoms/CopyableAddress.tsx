import React from 'react';
import useCopy from '@src/common/hooks/useCopy';
import { IShippingAddress } from '@src/features/purchases/types';
import styled from 'styled-components';
import { BiCopy } from 'react-icons/bi';

interface IProps {
  address: IShippingAddress;
}

function CopyableAddress({ address }: IProps) {
  const { isCopied, onCopy } = useCopy();

  const addressForCopy = `${address.country}, ${address.city}, ${address.state}, ${address.line1}, ${address.line2}`;

  return (
    <>
      <div>
        <div>
          {address.country}, {address.city}, {address.state}
        </div>
        <div>
          {address.line1}, {address.line2}
        </div>
      </div>
      <CopyButton type="button" isCopied={isCopied} onClick={() => onCopy(addressForCopy)}>
        <BiCopy />
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

export default CopyableAddress;
