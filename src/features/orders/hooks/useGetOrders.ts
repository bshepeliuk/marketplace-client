import { ParamKeyValuePair } from 'react-router-dom';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getOrders } from '../ordersSlice';
import groupByOrderId from '../helpers/groupByOrderId';

const useGetOrders = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, total } = useTypedSelector((state) => state.orders);

  const orders = groupByOrderId(items);

  const fetchOrders = ({
    limit,
    offset,
    filters,
  }: {
    limit: number;
    offset: number;
    filters?: ParamKeyValuePair[];
  }) => {
    dispatch(getOrders({ limit, offset, filters }));
  };

  return {
    isLoading,
    total,
    fetchOrders,
    items: orders,
  };
};

export default useGetOrders;
