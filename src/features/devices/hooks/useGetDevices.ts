import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePrevious from '@src/common/hooks/usePrevious';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useClearLocationState from '@src/common/hooks/useClearLocationState';
import { RootState } from '@src/app/store';
import { devicesSelector } from '../selectors/deviceSelector';
import useCheckIfShouldRefetchDevices from './useCheckIfShouldRefetchDevices';
import useFetchDevicesByRequest from './useFetchDevicesByRequest';

const useGetDevices = () => {
  const [params] = useSearchParams();
  const getAll = useFetchDevicesByRequest();
  const { shouldRefetchDevices } = useCheckIfShouldRefetchDevices();
  const { clearLocationState } = useClearLocationState();
  const prevParams = usePrevious(params.toString());

  const categoryId = params.get('categoryId');

  const selector = (state: RootState) => devicesSelector(state, categoryId);
  const { items, isLoading } = useTypedSelector(selector);

  const searchParams = params.toString();
  const hasNoDevices = items.length === 0;
  // prettier-ignore
  const hasRemovedFilterParams = prevParams && prevParams.length > searchParams.length;

  useEffect(() => {
    if (hasRemovedFilterParams) getAll();
  }, [searchParams]);

  useEffect(() => {
    if (hasNoDevices || shouldRefetchDevices) {
      getAll();
      clearLocationState();
    }
  }, [categoryId]);

  return {
    items,
    isLoading,
  };
};

export default useGetDevices;
