import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { getCharges } from '../chargesSlice';
import { chargesSelector } from '../selectors/chargesSelector';

const useGetCharges = () => {
  const { items, hasMore, isLoading, isError } = useTypedSelector(chargesSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharges({})); // FIXME: allow zero parameter;
  }, []);

  return {
    items,
    hasMore,
    isLoading,
    isError,
  };
};

export default useGetCharges;
