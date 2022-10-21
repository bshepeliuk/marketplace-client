import { useEffect, useState } from 'react';

import { Stats } from '@src/common/api/Api';
import { IStats } from '../types';

const useGetStats = () => {
  const [stats, setStats] = useState<IStats | undefined>();

  useEffect(() => {
    Stats.get().then((res) => {
      setStats(res.data.stats);
    });
  }, []);

  return stats;
};

export default useGetStats;
