import { useEffect } from 'react';
import { useAppDispatch } from '@common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { getDeviceById } from '../devicesSlice';
import { deviceSelector } from '../selectors/deviceSelector';

const useGetDeviceById = (deviceId: any) => {
  const dispatch = useAppDispatch();
  const { device, isLoading } = useTypedSelector((state) => {
    return deviceSelector(state, deviceId);
  });

  const getDevice = () => {
    dispatch(getDeviceById({ deviceId }));
  };

  useEffect(() => {
    if (device === undefined) {
      getDevice();
    }
  }, []);

  const hasNoDeviceFound = device === undefined && !isLoading;
  const hasDeviceImages = device?.images.length > 0;

  return {
    device,
    isLoading,
    hasNoDeviceFound,
    hasDeviceImages,
  };
};

export default useGetDeviceById;
