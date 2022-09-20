import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AccordionListView from '@src/features/filters/components/Accordion/AccordionListView';
import { FilterProvider } from '@src/features/filters/context/FilterContext';
import { SideBar } from '@src/features/filters/styles/filters.styled';
import useMountTransition from '@src/common/hooks/useMountTransition';
import getActiveSearchParamsEntries from '@src/features/filters/helpers/getActiveSearchParamsEntries';
import parseFeaturesParams from '@src/features/filters/helpers/parseFeaturesParams';
import useSetBodyScroll from '@src/common/hooks/useBodyScroll';
import {
  ClearFilterButton,
  CloseButton,
  CloseIcon,
  FilterIcon,
  FilterMenuOverlay,
  MenuContainer,
  OpenFilterButton,
  Wrap,
} from './filterBurgerMenu.styled';
import InteractionButtons from './components/InteractionButtons';

function FilterBurgerMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const hasTransitionedIn = useMountTransition({ isMounted: isOpen, unmountDelay: 300 });
  const setBodyScroll = useSetBodyScroll();

  const filters = getActiveSearchParamsEntries(searchParams);
  const activeParams = parseFeaturesParams(filters);

  const hasSearchParams = activeParams.length > 0;

  const toggleOpen = () => {
    if (!isOpen) setBodyScroll(false);

    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
    setBodyScroll(true);
  };

  const onClearFilter = () => {
    const categoryId = searchParams.get('categoryId');

    if (categoryId) {
      setSearchParams([['categoryId', categoryId]]);
    }
  };

  return (
    <>
      <Wrap>
        <OpenFilterButton type="button" onClick={toggleOpen}>
          <FilterIcon />
        </OpenFilterButton>

        {hasSearchParams && (
          <ClearFilterButton type="button" onClick={onClearFilter}>
            clear filter
          </ClearFilterButton>
        )}
      </Wrap>

      {(isOpen || hasTransitionedIn) && (
        <FilterMenuOverlay>
          <MenuContainer className="custom-scrollbar" isOpen={isOpen && hasTransitionedIn}>
            <CloseButton type="button" onClick={close}>
              <CloseIcon />
            </CloseButton>

            <FilterProvider>
              <SideBar>
                <AccordionListView />
                <InteractionButtons onClose={close} />
              </SideBar>
            </FilterProvider>
          </MenuContainer>
        </FilterMenuOverlay>
      )}
    </>
  );
}

export default FilterBurgerMenu;
