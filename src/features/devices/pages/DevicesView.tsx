import React, { useRef } from 'react';
import styled from 'styled-components';
import HeaderView from '@src/common/components/Header/HeaderView';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { Filters } from '@src/common/api/Api';
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
          <PriceFilterView />
        </FilterWrap>

        <DeviceListContainer ref={containerRef}>
          <DeviceListView containerRef={containerRef} />
        </DeviceListContainer>
      </Wrapper>
    </>
  );
}

const useGetMinMaxPriceByTypeId = (typeId: number | undefined) => {
  const [prices, setPrices] = React.useState<null | {
    min: number;
    max: number;
  }>(null);

  const getPrices = async () => {
    if (typeId === undefined) return;

    const result = await Filters.getMinMaxPriceByTypeId(typeId);
    setPrices(result.data.prices);
  };

  React.useEffect(() => {
    getPrices();
  }, [typeId]);

  return prices;
};

function PriceFilterView() {
  const typeId = useGetCategoryId();
  const prices = useGetMinMaxPriceByTypeId(typeId);

  return (
    <div>
      Price filter
      <p>min: {prices?.min}</p>
      <p>max: {prices?.max}</p>
    </div>
  );
}

export default DevicesView;
