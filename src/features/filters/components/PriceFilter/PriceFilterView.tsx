import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import React, { useState } from 'react';
import { AccordingHeader, ArrowIcon, Title } from '../../styles/filters.styled';
import PriceInfoView from './PriceInfoView';

const BODY_DEFAULT_HEIGHT = 121;

function PriceFilterView() {
  const options = useTypedSelector((state) => state.filters.options);
  const [isOpen, setIsOpen] = useState(true);

  const height = isOpen ? BODY_DEFAULT_HEIGHT : 0;

  const priceValues = Object.values(options.prices);
  const hasNoPrices = priceValues.length === 0 || priceValues.every((item) => item === 0) || options.isLoading;

  const toggleVisibility = () => setIsOpen(!isOpen);

  if (hasNoPrices) return null;

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isOpen} />
        <Title>Price</Title>
      </AccordingHeader>

      <PriceInfoView height={height} prices={options.prices} />
    </div>
  );
}

export default PriceFilterView;
