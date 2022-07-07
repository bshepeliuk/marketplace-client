import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '../devicesSlice';

const useFetchDevicesByRequest = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();

  const fetchDevices = () => {
    const filters = Array.from(params.entries());
    dispatch(getDevices({ filters, offset: 0, limit: 20 }));
  };

  return fetchDevices;
};

export default useFetchDevicesByRequest;
