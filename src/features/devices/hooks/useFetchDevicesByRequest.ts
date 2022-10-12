import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '../devicesSlice';
import { DEVICES_LIMIT } from '../constants';

interface IFetchProps {
  offset?: number;
  limit?: number;
}

const useFetchDevicesByRequest = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();

  const fetchDevices = (props?: IFetchProps) => {
    const offset = props?.offset ?? 0;
    const limit = props?.limit ?? DEVICES_LIMIT;

    const filters = Array.from(params.entries());

    dispatch(getDevices({ filters, offset, limit }));
  };

  return fetchDevices;
};

export default useFetchDevicesByRequest;
