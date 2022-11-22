import { useEffect } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { chargesSelector } from '../selectors/chargesSelector';
import useFetchCharges from './useFetchCharges';

const useGetCharges = () => {
  const { items, hasMore, isLoading, isError } = useTypedSelector(chargesSelector);
  const { fetchCharges } = useFetchCharges();

  useEffect(() => {
    fetchCharges();
  }, []);

  return {
    items,
    hasMore,
    isLoading,
    isError,
  };
};

export default useGetCharges;
