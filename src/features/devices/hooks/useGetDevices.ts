import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePrevious from '@src/common/hooks/usePrevious';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useClearLocationState from '@src/common/hooks/useClearLocationState';
import { RootState } from '@src/app/store';
import { getDevices } from '../devicesSlice';
import { devicesSelector } from '../selectors/deviceSelector';
import useCheckIfShouldRefetchDevices from './useCheckIfShouldRefetchDevices';

const useGetDevices = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const { shouldRefetchDevices } = useCheckIfShouldRefetchDevices();
  const clearLocationState = useClearLocationState();
  const prevParams = usePrevious(params.toString());

  const categoryId = params.get('categoryId');

  const selector = (state: RootState) => devicesSelector(state, categoryId);
  const { items, isLoading } = useTypedSelector(selector);

  const searchParams = params.toString();
  const hasNoDevices = items.length === 0;
  // prettier-ignore
  const hasRemovedFilterParams = prevParams && prevParams.length > searchParams.length;

  const getAll = () => {
    const filters = Array.from(params.entries());
    dispatch(getDevices({ filters, offset: 0, limit: 20 }));
  };

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
