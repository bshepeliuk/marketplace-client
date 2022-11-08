import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '../devicesSlice';
import { DEVICES_LIMIT } from '../constants';

interface IFetchProps {
  offset?: number;
  limit?: number;
  filters?: ParamKeyValuePair[];
}

const useFetchDevicesByRequest = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();

  const fetchDevices = (props?: IFetchProps) => {
    const offset = props?.offset ?? 0;
    const limit = props?.limit ?? DEVICES_LIMIT;

    const filters = props?.filters === undefined ? Array.from(params.entries()) : props.filters;

    dispatch(getDevices({ filters, offset, limit }));
  };

  return fetchDevices;
};

export default useFetchDevicesByRequest;
