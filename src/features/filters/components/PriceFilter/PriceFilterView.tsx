import React, { useState } from 'react';
import { AccordingHeader, ArrowIcon } from '../../styles/filters.styled';

import PriceInfoView from './PriceInfoView';

function PriceFilterView() {
  const [isVisible, setVisible] = useState<boolean>(true);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isVisible} />
        <div>Price</div>
      </AccordingHeader>

      {isVisible && <PriceInfoView />}
    </div>
  );
}

export default PriceFilterView;
