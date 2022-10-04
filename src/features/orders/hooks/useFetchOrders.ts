import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IGetOrdersParams } from '@src/common/types/apiTypes';
import { getOrders } from '../ordersSlice';
import groupByOrderId from '../helpers/groupByOrderId';

const useFetchOrders = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, total } = useTypedSelector((state) => state.orders);

  const orders = groupByOrderId(items);

  const fetchOrders = ({ limit, offset, filters }: IGetOrdersParams) => {
    dispatch(getOrders({ limit, offset, filters }));
  };

  return {
    isLoading,
    total,
    fetchOrders,
    items: orders,
  };
};

export default useFetchOrders;
