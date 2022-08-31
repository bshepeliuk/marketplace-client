import React from 'react';
import styled from 'styled-components';
import { FaOpencart } from 'react-icons/fa';

function EmptyCartView() {
  return (
    <Wrap>
      <EmptyCartIcon />
      <Text>Unfortunately your cart is empty yet.</Text>
    </Wrap>
  );
}

const Wrap = styled.div`
  height: var(--default-height);
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const EmptyCartIcon = styled(FaOpencart)`
  font-size: 100px;
  color: #bdc3c7;
`;

const Text = styled.p`
  color: #bdc3c7;
  font-size: 25px;
`;

export default EmptyCartView;
