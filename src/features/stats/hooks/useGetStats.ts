import { useEffect } from 'react';

import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getStats } from '../statsSlice';

const useGetStats = () => {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector((state) => state.stats);

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return items;
};

export default useGetStats;
