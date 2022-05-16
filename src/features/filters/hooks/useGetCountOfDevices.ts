import { useEffect, useState } from 'react';
import { ParamKeyValuePair } from 'react-router-dom';
import * as Api from '@src/common/api/Api';
import useFilterContext from './useFilterContext';

const useGetCountOfDevices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  const context = useFilterContext();
  // prettier-ignore
  const { getFilterParams, prices, selected, isInitPrice, hasSelectedItems } = context;

  useEffect(() => {
    if (!hasSelectedItems && isInitPrice) return;

    const params = getFilterParams();

    setIsLoading(true);

    const callback = () => getCountByParams(params);
    const timeoutId = setTimeout(callback, 1000);

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
