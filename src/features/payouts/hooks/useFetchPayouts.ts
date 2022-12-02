import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { MoneyMovementParams } from '@src/common/types/apiTypes';
import { getPayouts } from '../payoutsSlice';

const useFetchPayouts = () => {
  const dispatch = useAppDispatch();

  const fetchPayouts = ({ startingAfter, endingBefore, limit }: MoneyMovementParams = {}) => {
    dispatch(getPayouts({ startingAfter, endingBefore, limit }));
  };

  return {
    fetchPayouts,
  };
};

export default useFetchPayouts;
