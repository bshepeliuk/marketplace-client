import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { PAYOUTS_LIMIT } from '../constants';
import { payoutsActions } from '../payoutsSlice';
import { payoutsSelector } from '../selectors/payoutsSelector';
import useFetchPayouts from './useFetchPayouts';

const usePayoutsPagination = () => {
  const dispatch = useAppDispatch();
  const { startingAfter, endingBefore, firstItemId, items, lastItemId, isLoading } = useTypedSelector(payoutsSelector);
  const { fetchPayouts } = useFetchPayouts();

  const onNext = () => {
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);

    if (hasNoNextChunk(startingAfterIdx)) {
      fetchPayouts({ startingAfter });
      return;
    }

    const START_IDX = startingAfterIdx + 1;
    const END_IDX = startingAfterIdx + PAYOUTS_LIMIT;
    const lastItem = items[items.length - 1];

    const endingBeforeId = items[START_IDX].id;
    const startingAfterId = items[END_IDX]?.id ?? lastItem.id;

    dispatch(
      payoutsActions.changeBoundIds({
        endingBefore: endingBeforeId,
        startingAfter: startingAfterId,
      }),
    );
  };

  const onPrev = () => {
    const endingBeforeIdx = items.findIndex(({ id }) => id === endingBefore);

    if (hasNoPrevChunk(endingBeforeIdx)) {
      fetchPayouts({ endingBefore });
      return;
    }

    const START_IDX = endingBeforeIdx - PAYOUTS_LIMIT;
    const END_IDX = endingBeforeIdx - 1;

    dispatch(
      payoutsActions.changeBoundIds({
        endingBefore: items[START_IDX].id,
        startingAfter: items[END_IDX].id,
      }),
    );
  };

  const hasNoNextChunk = (idx: number) => {
    const nextChunk = items.slice(idx + 1, idx + PAYOUTS_LIMIT + 1);
    return nextChunk.length === 0;
  };

  const hasNoPrevChunk = (idx: number) => {
    const prevChunk = items.slice(idx - PAYOUTS_LIMIT, idx);
    return prevChunk.length === 0;
  };

  const hasMoreThanLimit = items.length >= PAYOUTS_LIMIT;
  const isNextDisabled = lastItemId === startingAfter || isLoading;
  const isPrevDisabled = firstItemId === endingBefore || endingBefore === null || isLoading;
  const hasPagination = hasMoreThanLimit;

  return {
    onNext,
    onPrev,
    isNextDisabled,
    isPrevDisabled,
    hasPagination,
  };
};

export default usePayoutsPagination;
