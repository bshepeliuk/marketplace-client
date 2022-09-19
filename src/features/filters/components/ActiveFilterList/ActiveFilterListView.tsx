import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import useHandleScrollOnMouseEvents from '@src/common/hooks/useHandleScrollOnMouseEvents';
import useHandleScrollBySideBtnClick from '@src/common/hooks/useHandleScrollBySideBtnClick';
import getActiveSearchParamsEntries from '../../helpers/getActiveSearchParamsEntries';
import joinMinMaxPricesInEntries from '../../helpers/joinMinMaxPricesInEntries';
import parseFeaturesParams from '../../helpers/parseFeaturesParams';
import {
  ClearAllButton,
  ScrollContainer,
  List,
  Wrap,
  LeftArrowButton,
  RightArrowButton,
} from '../../styles/activeFilterList.styled';
import ActiveListItemView from './components/ActiveListItemView';

function ActiveFilterListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = getActiveSearchParamsEntries(searchParams);
  const activeItems = parseFeaturesParams(filters);

  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const { isScrolling } = useHandleScrollOnMouseEvents({ ref: scrollWrapRef, deps: activeItems });
  // prettier-ignore
  const {
    isLeftVisible,
    isRightVisible,
    onLeftClick,
    onRightClick
  } = useHandleScrollBySideBtnClick(scrollWrapRef, activeItems.length);

  const items = joinMinMaxPricesInEntries(activeItems);

  const hasActiveItems = items.length > 0;
  const hasNoActiveItems = !hasActiveItems;

  const onClearAll = () => {
    const categoryId = searchParams.get('categoryId');

    if (categoryId) {
      setSearchParams([['categoryId', categoryId]]);
    }
  };

  if (hasNoActiveItems) return null;

  return (
    <Wrap>
      <LeftArrowButton type="button" onClick={onLeftClick} isLeftVisible={isLeftVisible}>
        <MdArrowBackIosNew />
      </LeftArrowButton>

      <ScrollContainer ref={scrollWrapRef} isScrolling={isScrolling}>
        <List>
          {items.map((item) => (
            <ActiveListItemView key={item[1]} item={item} />
          ))}
        </List>

        {hasActiveItems && (
          <ClearAllButton type="button" onClick={onClearAll}>
            clear
          </ClearAllButton>
        )}
      </ScrollContainer>

      <RightArrowButton type="button" onClick={onRightClick} isRightVisible={isRightVisible}>
        <MdArrowForwardIos />
      </RightArrowButton>
    </Wrap>
  );
}

export default ActiveFilterListView;
