import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { TRANSFERS_LIMIT } from '../constants';
import { transfersSelector } from '../selectors/transfersSelector';
import useFetchTransfers from './useFetchTransfers';

const useTransfersPagination = () => {
  const { startChunkId, endChunkId, firstItemId, items } = useTypedSelector(transfersSelector);
  const { fetchTransfers } = useFetchTransfers();

  const onNext = () => {
    fetchTransfers({ endChunkId });
  };
  const onPrev = () => {
    fetchTransfers({ startChunkId });
  };

  const hasChunkIds = startChunkId !== undefined && endChunkId !== undefined;
  const hasMoreThanLimit = items.length >= TRANSFERS_LIMIT;
  const isNextDisabled = items.length < TRANSFERS_LIMIT;
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

export default useTransfersPagination;
