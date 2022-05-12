import React, { useState } from 'react';
import { AccordingHeader, ArrowIcon } from '../../styles/filters.styled';
import { InfoStatus, InfoStatusUnion } from '../../types';
import PriceInfoView from './PriceInfoView';

function PriceFilterView() {
  const [infoStatus, setInfoStatus] = useState<InfoStatusUnion | null>(null);

  const toggleVisibility = () => {
    if (infoStatus === InfoStatus.hide) {
      setInfoStatus(InfoStatus.show);
      return;
    }

    setInfoStatus(InfoStatus.hide);
  };

  const isVisible = infoStatus === InfoStatus.show;

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isVisible} />
        <div>Price</div>
      </AccordingHeader>

      <PriceInfoView infoStatus={infoStatus} />
    </div>
  );
}

export default PriceFilterView;
