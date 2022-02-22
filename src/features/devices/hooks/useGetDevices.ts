import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { getDevices } from '../devicesSlice';
import { devicesSelector } from '../selectors/deviceSelector';

const useGetDevices = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector(devicesSelector);

  const getAll = () => dispatch(getDevices({ offset: 0, limit: 20 }));

  useEffect(() => {
    if (items.length === 0) {
      setSearchParams('');
      getAll();
    }
  }, []);

  return {
    items,
    isLoading,
  };
};

export default useGetDevices;
