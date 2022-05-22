import React from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
import styled from 'styled-components';
import { FaOpencart } from 'react-icons/fa';

function EmptyCartView() {
  return (
    <>
      <HeaderView />
      <Wrap>
        <EmptyCartIcon />
        <Text>Unfortunately your cart is empty yet.</Text>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  // 80px - header; 80px - margin-bottom;
  height: calc(100vh - 80px - 80px);
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
