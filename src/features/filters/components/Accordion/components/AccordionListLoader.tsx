import React from 'react';
import PriceLoader from '../../PriceFilter/PriceLoader';
import AccordionLoader from './AccordionLoader';

function AccordionListLoader() {
  return (
    <div>
      <PriceLoader />
      <AccordionLoader />
      <AccordionLoader />
      <AccordionLoader />
      <AccordionLoader />
    </div>
  );
}

export default AccordionListLoader;
