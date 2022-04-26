import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import getActiveSearchParamsEntries from '../../helpers/getActiveSearchParamsEntries';
import parseFeaturesParams from '../../helpers/parseFeaturesParams';
// eslint-disable-next-line max-len
import removeSearchParamsFromEntriesByValue from '../../helpers/removeSearchParamsFromEntriesByValue';
import {
  ClearAllButton,
  Container,
  DeleteButton,
  List,
} from '../../styles/activeFilterList.styled';

function ActiveFilterListView() {
  const [activeItems, setActiveItems] = useState<Array<string[]>>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const haveActiveItems = activeItems.length > 0;

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

  return haveActiveItems ? (
    <Container>
      <List>
        {activeItems.map((item) => (
          <ListItem key={item[1]} item={item} />
        ))}
      </List>

      <ClearAllButton type="button" onClick={onClearAll}>
        clear
      </ClearAllButton>
    </Container>
  ) : null;
}

interface IProps {
  item: string[];
}

function ListItem(props: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    const params = removeSearchParamsFromEntriesByValue(
      searchParams,
      props.item[1],
    );

    setSearchParams(params);
  };

  return (
    <li>
      {props.item[1]}
      <DeleteButton type="button" onClick={handleClick}>
        X
      </DeleteButton>
    </li>
  );
}

export default ActiveFilterListView;
