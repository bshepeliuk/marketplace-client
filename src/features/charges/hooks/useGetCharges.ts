import { useEffect } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFetchCharges from './useFetchCharges';
import { chargesChunkSelector } from '../selectors/chargesChunkSelector';

const useGetCharges = () => {
  const { items, hasMore, isLoading, isError } = useTypedSelector(chargesChunkSelector);
  const { fetchCharges } = useFetchCharges();

  const hasNoItems = items.length === 0;

  useEffect(() => {
    if (hasNoItems) {
      fetchCharges();
    }
  }, []);

  return {
    items,
    hasMore,
    isLoading,
    isError,
  };
};

export default useGetCharges;
