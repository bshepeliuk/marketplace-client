import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePrevious from '@src/common/hooks/usePrevious';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useClearLocationState from '@src/common/hooks/useClearLocationState';
import { RootState } from '@src/app/store';
import { devicesSelector } from '../selectors/deviceSelector';
import useFetchDevicesByRequest from './useFetchDevicesByRequest';

const useGetDevices = () => {
  const [params] = useSearchParams();
  const getAll = useFetchDevicesByRequest();
  const { clearLocationState } = useClearLocationState();
  const prevParams = usePrevious(params.toString());

  const categoryId = params.get('categoryId');

  const selector = (state: RootState) => devicesSelector(state, categoryId);
  const { items, isLoading, isError, total } = useTypedSelector(selector);

  const searchParams = params.toString();

  const hasRemovedFilterParams = prevParams && prevParams.length > searchParams.length;

  useEffect(() => {
    if (hasRemovedFilterParams) getAll();
  }, [searchParams]);

  useEffect(() => {
    getAll();
    clearLocationState();
  }, [categoryId]);

  return {
    total,
    items,
    isError,
    isLoading,
  };
};

export default useGetDevices;
