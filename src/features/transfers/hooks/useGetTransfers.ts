import { useEffect } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { transfersSelector } from '../selectors/transfersSelector';
import useFetchTransfers from './useFetchTransfers';

const useGetTransfers = () => {
  const { items, isLoading, isError, hasMore } = useTypedSelector(transfersSelector);
  const { fetchTransfers } = useFetchTransfers();

  useEffect(() => {
    fetchTransfers();
  }, []);

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};

export default useGetTransfers;
