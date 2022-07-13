import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IEvaluateDeviceParams } from '@src/common/types/apiTypes';
import { evaluateDevice } from '../devicesSlice';

const useEvaluateDevice = () => {
  const dispatch = useAppDispatch();
  const { isEvaluating, isEvaluatingError } = useTypedSelector(
    (state) => state.devices,
  );

  const evaluate = ({ rating, deviceId }: IEvaluateDeviceParams) => {
    dispatch(evaluateDevice({ rating, deviceId }));
  };

  return {
    evaluate,
    isEvaluating,
    isEvaluatingError,
  };
};

export default useEvaluateDevice;
