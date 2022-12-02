import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { MoneyMovementParams } from '@src/common/types/apiTypes';
import { getTransfers } from '../transfersSlice';

const useFetchTransfers = () => {
  const dispatch = useAppDispatch();

  const fetchTransfers = ({ startingAfter, endingBefore, limit }: MoneyMovementParams = {}) => {
    dispatch(getTransfers({ startingAfter, endingBefore, limit }));
  };

  return {
    fetchTransfers,
  };
};

export default useFetchTransfers;
