import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getFilterOptionsByCategoryId } from '@features/filters/filtersSlice';
import groupBy from '@src/common/utils/groupBy';

const useGetFilterOptionsByCategoryId = (categoryId: number | undefined) => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector((state) => state.filters.options);

  const hasNoCategoryId = categoryId === undefined;

  const hasOptions = items.every((item) => item.typeId === Number(categoryId));

  useEffect(() => {
    if (hasNoCategoryId) return;

    if (items.length === 0 || !hasOptions) {
      dispatch(getFilterOptionsByCategoryId({ categoryId }));
    }
  }, [categoryId]);

  return {
    isLoading,
    items: groupBy(items, 'title'),
  };
};

export default useGetFilterOptionsByCategoryId;
