import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getCharges } from '../chargesSlice';
import { CHARGES_LIMIT } from '../constants';

const useChargesPagination = () => {
  const dispatch = useAppDispatch();
  const { endingBefore, startingAfter, firstItemId, items } = useTypedSelector((state) => state.charges);

  const onNext = () => {
    dispatch(getCharges({ startingAfter }));
  };
  const onPrev = () => {
    dispatch(getCharges({ endingBefore }));
  };

  const isNextDisabled = items.length < CHARGES_LIMIT;
  const isPrevDisabled = firstItemId === endingBefore;
  const hasPagination = (endingBefore !== undefined && startingAfter !== undefined) || items.length >= CHARGES_LIMIT;

  return {
    onNext,
    onPrev,
    isNextDisabled,
    isPrevDisabled,
    hasPagination,
  };
};

export default useChargesPagination;
