import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { ICreateDeviceParams } from '@src/common/types/apiTypes';
import { createDevice } from '@src/features/devices/devicesSlice';

const useCreateDevice = () => {
  const dispatch = useAppDispatch();
  const { isCreating, isCreatingError } = useTypedSelector(
    (state) => state.devices,
  );

  const addNewDevice = async ({
    images,
    info,
    features,
    brandId,
    categoryId,
  }: ICreateDeviceParams) => {
    const action = await dispatch(
      createDevice({ images, info, features, brandId, categoryId }),
    );

    if (createDevice.fulfilled?.match(action)) {
      return action.payload.result; // deviceId
    }
  };

  return {
    isCreating,
    isCreatingError,
    addNewDevice,
  };
};

export default useCreateDevice;
