import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { getPayouts } from '../payoutsSlice';
import { payoutsSelector } from '../selectors/payoutsSelector';

const useGetPayouts = () => {
  const { items, isLoading, isError, hasMore } = useTypedSelector(payoutsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPayouts());
  }, []);

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};

export default useGetPayouts;
