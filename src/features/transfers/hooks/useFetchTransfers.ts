import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { IMoneyMovementParams } from '@src/common/types/apiTypes';
import { getTransfers } from '../transfersSlice';

const useFetchTransfers = () => {
  const dispatch = useAppDispatch();

  const fetchTransfers = ({ startChunkId, endChunkId, limit }: IMoneyMovementParams = {}) => {
    dispatch(getTransfers({ startChunkId, endChunkId, limit }));
  };

  return {
    fetchTransfers,
  };
};

export default useFetchTransfers;
