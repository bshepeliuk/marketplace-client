import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { IMoneyMovementParams } from '@src/common/types/apiTypes';
import { getPayouts } from '../payoutsSlice';

const useFetchPayouts = () => {
  const dispatch = useAppDispatch();

  const fetchPayouts = ({ startChunkId, endChunkId, limit }: IMoneyMovementParams = {}) => {
    dispatch(getPayouts({ startChunkId, endChunkId, limit }));
  };

  return {
    fetchPayouts,
  };
};

export default useFetchPayouts;
