import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import removePriceParamsFromEntries from '@src/features/filters/helpers/removePriceParamsFromEntries';
import removeSearchParamsFromEntriesByValue from '@src/features/filters/helpers/removeSearchParamsFromEntriesByValue';
import { DeleteButton, ListItem } from '../../../styles/activeFilterList.styled';

interface IProps {
  item: string[];
}

function ActiveListItemView(props: IProps) {
  const liRef = useRef<HTMLLIElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [key, value] = props.item;

  useEffect(() => {
    if (!liRef.current) return;

    setWidth(liRef.current.clientWidth);
  }, []);

  const handleRemove = () => {
    let params = removeSearchParamsFromEntriesByValue(searchParams, value);

    if (key === 'prices') {
      params = removePriceParamsFromEntries(params);
    }

    setTimeout(() => setSearchParams(params), 300);
    setIsMounted(false);
  };

  return (
    <ListItem ref={liRef} isMounted={isMounted} width={width}>
      {value}

      <DeleteButton data-delete-item-btn type="button" onClick={handleRemove}>
        X
      </DeleteButton>
    </ListItem>
  );
}

export default ActiveListItemView;
