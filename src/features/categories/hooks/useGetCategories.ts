import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { getCategories } from '../categoriesSlice';
import { categoriesSelector } from '../selectors/categoriesSelector';

const useGetCategories = () => {
  const { items, isLoading } = useTypedSelector(categoriesSelector);
  const dispatch = useAppDispatch();

  const fetchCategories = () => {
    dispatch(getCategories());
  };

  const hasNoCategories = items.length === 0;

  useEffect(() => {
    if (hasNoCategories) {
      fetchCategories();
    }
  }, []);

  return {
    items,
    isLoading,
  };
};

export default useGetCategories;
