import React from 'react';
import ApplyFilterButton from '../atoms/ApplyFilterButton';
import { FilterProvider } from '../context/FilterContext';
import { SideBar } from '../styles/filters.styled';
import FilterAccordionView from './Accordion/AccordionView';
import PriceFilterView from './PriceFilter/PriceFilterView';

function SideBarDeviceFilterView() {
  return (
    <FilterProvider>
      <SideBar>
        <ApplyFilterButton />
        <PriceFilterView />
        <FilterAccordionView />
      </SideBar>
    </FilterProvider>
  );
}

export default SideBarDeviceFilterView;
