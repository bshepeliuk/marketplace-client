import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { TRANSFERS_LIMIT } from '../constants';
import { transfersSelector } from '../selectors/transfersSelector';
import { transfersActions } from '../transfersSlice';
import useFetchTransfers from './useFetchTransfers';

const useTransfersPagination = () => {
  const dispatch = useAppDispatch();
  const { fetchTransfers } = useFetchTransfers();
  // prettier-ignore
  const {
    startingAfter,
    endingBefore,
    firstItemId,
    items,
    isLoading,
    lastItemId
  } = useTypedSelector(transfersSelector);

  const onNext = () => {
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);

    if (hasNoNextChunk(startingAfterIdx)) {
      fetchTransfers({ startingAfter });
      return;
    }

    const START_IDX = startingAfterIdx + 1;
    const END_IDX = startingAfterIdx + TRANSFERS_LIMIT;
    const lastItem = items[items.length - 1];

    const endingBeforeId = items[START_IDX].id;
    const startingAfterId = items[END_IDX]?.id ?? lastItem.id;

    dispatch(
      transfersActions.changeBoundIds({
        endingBefore: endingBeforeId,
        startingAfter: startingAfterId,
      }),
    );
  };

  const onPrev = () => {
    const endingBeforeIdx = items.findIndex(({ id }) => id === endingBefore);

    if (hasNoPrevChunk(endingBeforeIdx)) {
      fetchTransfers({ endingBefore });
      return;
    }

    const START_IDX = endingBeforeIdx - TRANSFERS_LIMIT;
    const END_IDX = endingBeforeIdx - 1;

    dispatch(
      transfersActions.changeBoundIds({
        endingBefore: items[START_IDX].id,
        startingAfter: items[END_IDX].id,
      }),
    );
  };

  const hasNoNextChunk = (idx: number) => {
    const nextChunk = items.slice(idx + 1, idx + TRANSFERS_LIMIT + 1);
    return nextChunk.length === 0;
  };

  const hasNoPrevChunk = (idx: number) => {
    const prevChunk = items.slice(idx - TRANSFERS_LIMIT, idx);
    return prevChunk.length === 0;
  };

  const hasMoreThanLimit = items.length >= TRANSFERS_LIMIT;
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

export default useTransfersPagination;
