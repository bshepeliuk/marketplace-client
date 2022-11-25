import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { IMoneyMovementParams } from '@src/common/types/apiTypes';
import { getCharges } from '../chargesSlice';

const useFetchCharges = () => {
  const dispatch = useAppDispatch();

  const fetchCharges = ({ startChunkId, endChunkId, limit }: IMoneyMovementParams = {}) => {
    dispatch(getCharges({ startChunkId, endChunkId, limit }));
  };

  return {
    fetchCharges,
  };
};

export default useFetchCharges;
