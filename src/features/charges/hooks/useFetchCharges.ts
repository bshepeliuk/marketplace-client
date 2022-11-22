import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { IGetChargesParams } from '@src/common/types/apiTypes';
import { getCharges } from '../chargesSlice';

const useFetchCharges = () => {
  const dispatch = useAppDispatch();

  const fetchCharges = ({ startChunkId, endChunkId, limit }: IGetChargesParams = {}) => {
    dispatch(getCharges({ startChunkId, endChunkId, limit }));
  };

  return {
    fetchCharges,
  };
};

export default useFetchCharges;
