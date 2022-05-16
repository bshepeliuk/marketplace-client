import React from 'react';
import { FilterProvider } from '../context/FilterContext';
import { SideBar } from '../styles/filters.styled';
import FilterAccordionView from './Accordion/AccordionView';
import InteractionWithFilterView from './InteractionWithFilterView';
import PriceFilterView from './PriceFilter/PriceFilterView';

function FilterSideBarView() {
  return (
    <FilterProvider>
      <SideBar>
        <InteractionWithFilterView />
        <PriceFilterView />
        <FilterAccordionView />
      </SideBar>
    </FilterProvider>
  );
}

export default FilterSideBarView;
