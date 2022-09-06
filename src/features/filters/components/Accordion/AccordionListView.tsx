import React from 'react';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
// eslint-disable-next-line max-len
import useGetFilterOptionsByCategoryId from '../../hooks/useGetFilterOptionsByCategoryId';
import AccordionItemView from './AccordionItemView';
import PriceFilterView from '../PriceFilter/PriceFilterView';
import PriceLoader from '../PriceFilter/PriceLoader';
import AccordionLoader from './AccordionLoader';

function AccordionListView() {
  const categoryId = useGetCategoryId();
  const { items, isLoading } = useGetFilterOptionsByCategoryId(categoryId);

  if (isLoading) {
    return (
      <div>
        <PriceLoader />
        <AccordionLoader />
        <AccordionLoader />
        <AccordionLoader />
        <AccordionLoader />
      </div>
    );
  }

  return (
    <>
      <PriceFilterView />

      <ul>
        {items.map(([title, info]) => (
          <AccordionItemView key={title} title={title} info={info} />
        ))}
      </ul>
    </>
  );
}

export default AccordionListView;
