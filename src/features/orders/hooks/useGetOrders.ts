import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getOrders } from '../ordersSlice';
import { ordersSelector } from '../selectors/ordersSelector';

const useGetOrders = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector(ordersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return {
    items,
    isLoading,
  };
};

export default useGetOrders;
