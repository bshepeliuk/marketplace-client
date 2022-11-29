import { useEffect } from 'react';

import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFetchPayouts from './useFetchPayouts';
import { payoutsChunkSelector } from '../selectors/payoutsChunkSelector';

const useGetPayouts = () => {
  const { items, isLoading, isError, hasMore } = useTypedSelector(payoutsChunkSelector);
  const { fetchPayouts } = useFetchPayouts();

  const hasNoItems = items.length === 0;

  useEffect(() => {
    if (hasNoItems) {
      fetchPayouts();
    }
  }, []);

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};

export default useGetPayouts;
