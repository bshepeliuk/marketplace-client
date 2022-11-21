import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { transfersSelector } from '../selectors/transfersSelector';
import { getTransfers } from '../transfersSlice';

const useGetTransfers = () => {
  const { items, isLoading, isError, hasMore } = useTypedSelector(transfersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransfers());
  }, []);

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};

export default useGetTransfers;
