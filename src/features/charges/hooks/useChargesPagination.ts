import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { CHARGES_LIMIT } from '../constants';
import { chargesSelector } from '../selectors/chargesSelector';
import useFetchCharges from './useFetchCharges';

const useChargesPagination = () => {
  const { startChunkId, endChunkId, firstItemId, items } = useTypedSelector(chargesSelector);
  const { fetchCharges } = useFetchCharges();

  const onNext = () => {
    fetchCharges({ endChunkId });
  };
  const onPrev = () => {
    fetchCharges({ startChunkId });
  };

  const hasChunkIds = startChunkId !== undefined && endChunkId !== undefined;
  const hasMoreThanLimit = items.length >= CHARGES_LIMIT;
  const isNextDisabled = items.length < CHARGES_LIMIT;
  const isPrevDisabled = firstItemId === startChunkId;
  const hasPagination = hasChunkIds || hasMoreThanLimit;

  return {
    onNext,
    onPrev,
    isNextDisabled,
    isPrevDisabled,
    hasPagination,
  };
};

export default useChargesPagination;
