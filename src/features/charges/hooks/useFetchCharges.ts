import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { MoneyMovementParams } from '@src/common/types/apiTypes';
import { getCharges } from '../chargesSlice';

const useFetchCharges = () => {
  const dispatch = useAppDispatch();

  const fetchCharges = ({ endingBefore, startingAfter, limit }: MoneyMovementParams = {}) => {
    dispatch(getCharges({ endingBefore, startingAfter, limit }));
  };

  return {
    fetchCharges,
  };
};

export default useFetchCharges;
