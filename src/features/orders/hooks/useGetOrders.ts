import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getOrders } from '../ordersSlice';
import groupByOrderId from '../helpers/groupByOrderId';

const useGetOrders = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector((state) => state.orders);

  const orders = groupByOrderId(items);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return {
    isLoading,
    items: orders,
  };
};

export default useGetOrders;
