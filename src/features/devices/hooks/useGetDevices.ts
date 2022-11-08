import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useClearLocationState from '@src/common/hooks/useClearLocationState';
import { RootState } from '@src/app/store';
import { devicesSelector } from '../selectors/deviceSelector';
import useFetchDevicesByRequest from './useFetchDevicesByRequest';

const useGetDevices = () => {
  const [params] = useSearchParams();
  const getAll = useFetchDevicesByRequest();
  const { clearLocationState } = useClearLocationState();

  const categoryId = params.get('categoryId');

  const selector = (state: RootState) => devicesSelector(state, categoryId);
  const { items, isLoading, isError, total } = useTypedSelector(selector);

  useEffect(() => {
    if (items.length === 0) {
      getAll();
      clearLocationState();
    }
  }, []);

  return {
    total,
    items,
    isError,
    isLoading,
  };
};

export default useGetDevices;
