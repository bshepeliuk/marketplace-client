import React, { useEffect, useState } from 'react';
import { ParamKeyValuePair } from 'react-router-dom';
import * as Api from '@src/common/api/Api';
import { ApplyButton } from '../styles/filters.styled';
import useFilterContext from '../hooks/useFilterContext';

const useGetCountOfDevices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  const getCountByParams = async (params: ParamKeyValuePair[]) => {
    setIsLoading(true);

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
      setCount(0);
      setIsLoading(false);
    }
  };

  return {
    setCount,
    count,
    getCountByParams,
    isLoading,
  };
};

function ApplyFilterButton() {
  // prettier-ignore
  const {
    count,
    isLoading,
    getCountByParams,
    setCount
  } = useGetCountOfDevices();
  const context = useFilterContext();

  const {
    apply,
    getFilterParams,
    prices,
    selected,
    isInitPrice,
    hasSelectedItems,
  } = context;

  useEffect(() => {
    if (!hasSelectedItems || !isInitPrice) return;

    const params = getFilterParams();

    const timeoutId = setTimeout(() => {
      getCountByParams(params);
    }, 1000);

    return () => {
      setCount(0);
      clearTimeout(timeoutId);
    };
  }, [selected.length, prices]);

  return (
    <ApplyButton type="button" onClick={apply}>
      show - {isLoading ? '...' : count}
    </ApplyButton>
  );
}

export default ApplyFilterButton;
