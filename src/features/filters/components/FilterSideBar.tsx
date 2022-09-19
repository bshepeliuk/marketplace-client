import React from 'react';
import { FilterProvider } from '../context/FilterContext';
import { SideBar } from '../styles/filters.styled';
import AccordionListView from './Accordion/AccordionListView';
import InteractionWithFilterView from './InteractionWithFilterView';

function FilterSideBarView() {
  return (
    <FilterProvider>
      <SideBar>
        <InteractionWithFilterView />
        <AccordionListView />
      </SideBar>
    </FilterProvider>
  );
}

export default FilterSideBarView;
