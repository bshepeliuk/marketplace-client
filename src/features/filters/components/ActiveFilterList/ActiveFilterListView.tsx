/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import useHandleScrollOnMouseEvents from '@src/common/hooks/useHandleScrollOnMouseEvents';
import useHandleScrollBySideBtnClick from '@src/common/hooks/useHandleScrollBySideBtnClick';
import getActiveSearchParamsEntries from '../../helpers/getActiveSearchParamsEntries';
import joinMinMaxPricesInEntries from '../../helpers/joinMinMaxPricesInEntries';
import parseFeaturesParams from '../../helpers/parseFeaturesParams';
import removePriceParamsFromEntries from '../../helpers/removePriceParamsFromEntries';
import removeSearchParamsFromEntriesByValue from '../../helpers/removeSearchParamsFromEntriesByValue';
import {
  ClearAllButton,
  ScrollContainer,
  DeleteButton,
  List,
  ListItem,
  Wrap,
  LeftArrowButton,
  RightArrowButton,
} from '../../styles/activeFilterList.styled';

function ActiveFilterListView() {
  const scrollWrapRef = useRef<HTMLDivElement>(null);

  const [activeItems, setActiveItems] = useState<Array<string[]>>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isScrolling } = useHandleScrollOnMouseEvents(scrollWrapRef);
  // prettier-ignore
  const {
    isLeftVisible,
    isRightVisible,
    onLeftClick,
    onRightClick
  } = useHandleScrollBySideBtnClick(scrollWrapRef, activeItems.length);

  useEffect(() => {
    const filters = getActiveSearchParamsEntries(searchParams);
    const activeParams = parseFeaturesParams(filters);

    setActiveItems(activeParams);
  }, [searchParams.toString()]);

  const onClearAll = () => {
    const categoryId = searchParams.get('categoryId');

    if (categoryId) {
      setSearchParams([['categoryId', categoryId]]);
    }
  };

  const items = joinMinMaxPricesInEntries(activeItems);

  return (
    <Wrap>
      <LeftArrowButton
        type="button"
        onClick={onLeftClick}
        isLeftVisible={isLeftVisible}
      >
        <MdArrowBackIosNew />
      </LeftArrowButton>

      <ScrollContainer ref={scrollWrapRef} isScrolling={isScrolling}>
        <List>
          {items.map((item) => (
            <ListItemView key={item[1]} item={item} />
          ))}
        </List>
        <ClearAllButton type="button" onClick={onClearAll}>
          clear
        </ClearAllButton>
      </ScrollContainer>

      <RightArrowButton
        type="button"
        onClick={onRightClick}
        isRightVisible={isRightVisible}
      >
        <MdArrowForwardIos />
      </RightArrowButton>
    </Wrap>
  );
}

function ListItemView(props: { item: string[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [key, value] = props.item;

  const handleClick = () => {
    let params = removeSearchParamsFromEntriesByValue(searchParams, value);

    if (key === 'prices') {
      // TODO: refactoring;
      params = removePriceParamsFromEntries(params);
    }

    setSearchParams(params);
  };

  return (
    <ListItem>
      {value}
      <DeleteButton type="button" onClick={handleClick}>
        X
      </DeleteButton>
    </ListItem>
  );
}

export default ActiveFilterListView;
