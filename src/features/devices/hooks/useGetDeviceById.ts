import { useEffect, useState } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getDeviceById } from '../devicesSlice';
import { deviceSelector } from '../selectors/deviceSelector';

const useGetDeviceById = (deviceId: number) => {
  const [hasNoFound, setHasNoFound] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { device, isLoading } = useTypedSelector((state) => {
    return deviceSelector(state, deviceId);
  });

  const hasNoDevice = device === undefined;

  const getDevice = () => {
    dispatch(getDeviceById({ deviceId })).then((action) => {
      if (getDeviceById.rejected.match(action)) setHasNoFound(true);
    });
  };

  useEffect(() => {
    if (hasNoDevice) {
      getDevice();
    }
  }, []);

  return {
    device,
    hasNoDevice,
    isLoading,
    hasNoFound,
  };
};

export default useGetDeviceById;
