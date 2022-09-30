import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import groupByOrderId from '@src/features/orders/helpers/groupByOrderId';
import { getPurchases } from '../purchasesSlice';

const useGetPurchases = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, total } = useTypedSelector((state) => state.purchases);

  const purchases = groupByOrderId(items);

  const fetchPurchases = ({ limit, offset }: { limit: number; offset: number }) => {
    dispatch(getPurchases({ limit, offset }));
  };

  return {
    total,
    isLoading,
    fetchPurchases,
    items: purchases,
  };
};

export default useGetPurchases;
