import { ParamKeyValuePair } from 'react-router-dom';

import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getStats } from '../statsSlice';

const useFetchStats = () => {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector((state) => state.stats);

  const fetchStats = ({ filters }: { filters: ParamKeyValuePair[] }) => {
    dispatch(getStats({ filters }));
  };

  return { fetchStats, items };
};

export default useFetchStats;
