import { useEffect } from 'react';

import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { payoutsSelector } from '../selectors/payoutsSelector';
import useFetchPayouts from './useFetchPayouts';

const useGetPayouts = () => {
  const { items, isLoading, isError, hasMore } = useTypedSelector(payoutsSelector);
  const { fetchPayouts } = useFetchPayouts();

  useEffect(() => {
    fetchPayouts();
  }, []);

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};

export default useGetPayouts;
