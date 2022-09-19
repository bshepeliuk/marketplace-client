import { useEffect, useState } from 'react';
import { ParamKeyValuePair } from 'react-router-dom';
import * as Api from '@src/common/api/Api';
import useFilterContext from './useFilterContext';

const useGetCountOfDevices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const context = useFilterContext();

  const { getFilterParams, prices, selected, hasInitFilterState } = context;

  useEffect(() => {
    if (hasInitFilterState) return;

    const params = getFilterParams();

    setIsLoading(true);

    const timeoutId = setTimeout(() => getCountByParams(params), 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selected.length, prices]);

  const getCountByParams = async (params: ParamKeyValuePair[]) => {
    try {
      const res = await Api.Devices.get({
        limit: 20,
        offset: 0,
        filters: params,
      });

      setCount(res.data.devices.length);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setIsLoading(false);
      setCount(0);
    }
  };

  return {
    count,
    getCountByParams,
    isLoading,
  };
};

export default useGetCountOfDevices;
