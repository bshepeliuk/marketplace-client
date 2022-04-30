import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import getActiveSearchParamsEntries from '../../helpers/getActiveSearchParamsEntries';
import joinMinMaxPricesInEntries from '../../helpers/joinMinMaxPricesInEntries';
import parseFeaturesParams from '../../helpers/parseFeaturesParams';
import removePriceParamsFromEntries from '../../helpers/removePriceParamsFromEntries';
// eslint-disable-next-line max-len
import removeSearchParamsFromEntriesByValue from '../../helpers/removeSearchParamsFromEntriesByValue';
import useHandleScrollOnMouseEvents from '../../hooks/useHandleScrollOnMouseEvents';
import {
  ClearAllButton,
  Container,
  DeleteButton,
  List,
  ListItem,
} from '../../styles/activeFilterList.styled';

function ActiveFilterListView() {
  const [activeItems, setActiveItems] = useState<Array<string[]>>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { wrapRef, isScrolling } = useHandleScrollOnMouseEvents();

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
    <Container ref={wrapRef} isScrolling={isScrolling}>
      <List>
        {items.map((item) => (
          <ListItemView key={item[1]} item={item} />
        ))}
      </List>
      <ClearAllButton type="button" onClick={onClearAll}>
        clear
      </ClearAllButton>
    </Container>
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
