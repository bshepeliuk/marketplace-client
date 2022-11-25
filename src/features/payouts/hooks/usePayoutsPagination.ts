import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { PAYOUTS_LIMIT } from '../constants';
import { payoutsSelector } from '../selectors/payoutsSelector';
import useFetchPayouts from './useFetchPayouts';

const usePayoutsPagination = () => {
  const { startChunkId, endChunkId, firstItemId, items } = useTypedSelector(payoutsSelector);
  const { fetchPayouts } = useFetchPayouts();

  const onNext = () => {
    fetchPayouts({ endChunkId });
  };
  const onPrev = () => {
    fetchPayouts({ startChunkId });
  };

  const hasChunkIds = startChunkId !== undefined && endChunkId !== undefined;
  const hasMoreThanLimit = items.length >= PAYOUTS_LIMIT;
  const isNextDisabled = items.length < PAYOUTS_LIMIT;
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

export default usePayoutsPagination;
