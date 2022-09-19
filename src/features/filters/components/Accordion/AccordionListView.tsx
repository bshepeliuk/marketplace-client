import React from 'react';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import useGetFilterOptionsByCategoryId from '../../hooks/useGetFilterOptionsByCategoryId';
import AccordionItemView from './components/AccordionItemView';
import PriceFilterView from '../PriceFilter/PriceFilterView';
import AccordionListLoader from './components/AccordionListLoader';

function AccordionListView() {
  const categoryId = useGetCategoryId();
  const { items, isLoading } = useGetFilterOptionsByCategoryId(categoryId);

  if (isLoading) return <AccordionListLoader />;

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
