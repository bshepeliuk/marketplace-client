import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { getBalance } from '../balanceSlice';
import { balanceSelector } from '../selectors/balanceSelector';

const useGetBalance = () => {
  const dispatch = useAppDispatch();
  const { balance, isLoading } = useTypedSelector(balanceSelector);

  useEffect(() => {
    dispatch(getBalance());
  }, []);

  return {
    balance,
    isLoading,
  };
};

export default useGetBalance;
