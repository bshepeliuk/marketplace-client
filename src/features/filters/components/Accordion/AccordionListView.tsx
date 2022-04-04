import React from 'react';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
// eslint-disable-next-line max-len
import useGetFilterOptionsByCategoryId from '../../hooks/useGetFilterOptionsByCategoryId';
import AccordionItemView from './AccordionItemView';

function AccordionListView() {
  const categoryId = useGetCategoryId();
  const { items } = useGetFilterOptionsByCategoryId(categoryId);

  return (
    <ul>
      {items.map(([title, info]) => (
        <AccordionItemView key={title} title={title} info={info} />
      ))}
    </ul>
  );
}

export default AccordionListView;
