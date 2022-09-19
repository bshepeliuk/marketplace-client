import React, { useState } from 'react';
import { AccordingHeader, ArrowIcon } from '../../styles/filters.styled';
import PriceInfoView from './PriceInfoView';

const BODY_DEFAULT_HEIGHT = 121;

function PriceFilterView() {
  const [isOpen, setIsOpen] = useState(true);

  const height = isOpen ? BODY_DEFAULT_HEIGHT : 0;

  const toggleVisibility = () => setIsOpen(!isOpen);

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isOpen} />
        <div>Price</div>
      </AccordingHeader>

      <PriceInfoView height={height} />
    </div>
  );
}

export default PriceFilterView;
