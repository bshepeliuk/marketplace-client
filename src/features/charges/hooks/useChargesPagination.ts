import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { chargesActions } from '../chargesSlice';
import { CHARGES_LIMIT } from '../constants';
import { chargesSelector } from '../selectors/chargesSelector';
import useFetchCharges from './useFetchCharges';

const useChargesPagination = () => {
  const dispatch = useAppDispatch();
  const { items, startingAfter, endingBefore, firstItemId, lastItemId, isLoading } = useTypedSelector(chargesSelector);
  const { fetchCharges } = useFetchCharges();

  const onNext = () => {
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);

    if (hasNoNextChunk(startingAfterIdx)) {
      fetchCharges({ startingAfter });
      return;
    }

    const START_IDX = startingAfterIdx + 1;
    const END_IDX = startingAfterIdx + CHARGES_LIMIT;
    const lastItem = items[items.length - 1];

    const endingBeforeId = items[START_IDX].id;
    const startingAfterId = items[END_IDX]?.id ?? lastItem.id;

    dispatch(
      chargesActions.changeBoundIds({
        endingBefore: endingBeforeId,
        startingAfter: startingAfterId,
      }),
    );
  };

  const onPrev = () => {
    const endingBeforeIdx = items.findIndex(({ id }) => id === endingBefore);

    if (hasNoPrevChunk(endingBeforeIdx)) {
      fetchCharges({ endingBefore });
      return;
    }

    const START_IDX = endingBeforeIdx - CHARGES_LIMIT;
    const END_IDX = endingBeforeIdx - 1;

    dispatch(
      chargesActions.changeBoundIds({
        endingBefore: items[START_IDX].id,
        startingAfter: items[END_IDX].id,
      }),
    );
  };

  const hasNoNextChunk = (idx: number) => {
    const nextChunk = items.slice(idx + 1, idx + CHARGES_LIMIT + 1);
    return nextChunk.length === 0;
  };

  const hasNoPrevChunk = (idx: number) => {
    const prevChunk = items.slice(idx - CHARGES_LIMIT, idx);
    return prevChunk.length === 0;
  };

  const hasMoreThanLimit = items.length >= CHARGES_LIMIT;
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

export default useChargesPagination;
