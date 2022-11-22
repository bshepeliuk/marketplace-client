import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { CHARGES_LIMIT } from '../constants';
import useFetchCharges from './useFetchCharges';

const useChargesPagination = () => {
  const { startChunkId, endChunkId, firstItemId, items } = useTypedSelector((state) => state.charges);
  const { fetchCharges } = useFetchCharges();

  const onNext = () => {
    fetchCharges({ endChunkId });
  };
  const onPrev = () => {
    fetchCharges({ startChunkId });
  };

  const isNextDisabled = items.length < CHARGES_LIMIT;
  const isPrevDisabled = firstItemId === startChunkId;
  const hasPagination = (startChunkId !== undefined && endChunkId !== undefined) || items.length >= CHARGES_LIMIT;

  return {
    onNext,
    onPrev,
    isNextDisabled,
    isPrevDisabled,
    hasPagination,
  };
};

export default useChargesPagination;
