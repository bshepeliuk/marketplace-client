import React, { useState } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { AccordingHeader, ArrowIcon } from '../styles/filters.styled';

function PriceFilterView() {
  const [isItVisible, setVisible] = useState<boolean>(true);
  const { prices } = useTypedSelector((state) => state.filters.options);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isItVisible} />
        <div>Price</div>
      </AccordingHeader>

      {isItVisible && (
        <div>
          <p>min: {prices.min} </p>
          <p>max: {prices.max} </p>
        </div>
      )}
    </div>
  );
}

export default PriceFilterView;
