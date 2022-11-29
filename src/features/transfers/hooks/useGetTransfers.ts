import { useEffect } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFetchTransfers from './useFetchTransfers';
import { transfersChunkSelector } from '../selectors/transfersChunkSelector';

const useGetTransfers = () => {
  const { items, isLoading, isError, hasMore } = useTypedSelector(transfersChunkSelector);
  const { fetchTransfers } = useFetchTransfers();

  const hasNoItems = items.length === 0;

  useEffect(() => {
    if (hasNoItems) {
      fetchTransfers();
    }
  }, []);

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};

export default useGetTransfers;
