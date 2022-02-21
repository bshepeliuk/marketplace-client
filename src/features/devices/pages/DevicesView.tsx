import React, { useRef } from 'react';
import styled from 'styled-components';
import HeaderView from '@src/common/components/Header/HeaderView';
import DeviceListView from '../components/DeviceListView';

export const DeviceListContainer = styled.div`
  max-width: 1200px;

  @media (max-width: 1600px) {
    max-width: 900px;
  }

  @media (max-width: 996px) {
    max-width: 605px;
  }

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1200px;
  justify-content: center;

  @media (max-width: 1600px) {
    grid-template-columns: 400px 900px;
  }

  @media (max-width: 1340px) {
    grid-template-columns: 400px 605px;
  }

  @media (max-width: 1020px) {
    grid-template-columns: 400px 320px;
  }
`;

export const FilterWrap = styled.div`
  border: 1px solid green;
  padding: 20px;
  height: calc(100vh - 80px);
`;

function DevicesView() {
  const containerRef = useRef<any>(null);

  return (
    <>
      <HeaderView />

      <Wrapper>
        <FilterWrap>
          <div>Price filter</div>
        </FilterWrap>

        <DeviceListContainer ref={containerRef}>
          <DeviceListView containerRef={containerRef} />
        </DeviceListContainer>
      </Wrapper>
    </>
  );
}

export default DevicesView;
