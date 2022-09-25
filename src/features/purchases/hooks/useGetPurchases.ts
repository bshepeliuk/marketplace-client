import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { getPurchases } from '../purchasesSlice';
import { purchasesSelector } from '../selectors/purchasesSelector';

const useGetPurchases = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector(purchasesSelector);

  useEffect(() => {
    dispatch(getPurchases());
  }, []);

  return {
    items,
    isLoading,
  };
};

export default useGetPurchases;
