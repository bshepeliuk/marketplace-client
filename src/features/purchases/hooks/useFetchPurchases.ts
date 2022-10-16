import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IGetOrdersParams } from '@src/common/types/apiTypes';
import groupByOrderId from '@src/features/orders/helpers/groupByOrderId';
import { getPurchases } from '../purchasesSlice';

const useFetchPurchases = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, total, notFound } = useTypedSelector((state) => state.purchases);

  const purchases = groupByOrderId(items);

  const fetchPurchases = ({ limit, offset, filters }: IGetOrdersParams) => {
    dispatch(getPurchases({ limit, offset, filters }));
  };

  return {
    notFound,
    total,
    isLoading,
    fetchPurchases,
    items: purchases,
  };
};

export default useFetchPurchases;
