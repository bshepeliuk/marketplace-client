import { useEffect } from 'react';
import { useAppDispatch } from '@common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { getDeviceById } from '../devicesSlice';
import { deviceSelector } from '../selectors/deviceSelector';

const useGetDeviceById = (deviceId: any) => {
  const dispatch = useAppDispatch();
  const device = useTypedSelector((state) => deviceSelector(state, deviceId));

  const getDevice = () => {
    dispatch(getDeviceById({ deviceId }));
  };

  useEffect(() => {
    if (!device) {
      getDevice();
    }
  }, []);

  return {
    device,
  };
};

export default useGetDeviceById;
