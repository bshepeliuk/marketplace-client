import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { useEffect } from 'react';
import { getCategories } from '../categoriesSlice';

const useGetCategories = () => {
  const { items, isLoading } = useTypedSelector((state) => state.categories);
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
