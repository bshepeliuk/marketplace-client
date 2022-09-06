import React from 'react';
import { FilterProvider } from '../context/FilterContext';
import { SideBar } from '../styles/filters.styled';
import FilterAccordionView from './Accordion/AccordionView';
import InteractionWithFilterView from './InteractionWithFilterView';

function FilterSideBarView() {
  return (
    <FilterProvider>
      <SideBar>
        <InteractionWithFilterView />
        <FilterAccordionView />
      </SideBar>
    </FilterProvider>
  );
}

export default FilterSideBarView;
