import useNewDeviceContext from './useNewDeviceContext';

const useCheckStep = () => {
  const { formState } = useNewDeviceContext();

  const steps: Record<string, boolean> = {
    '1': formState.brand !== null,
    '2': formState.category !== null,
    '3': formState.info !== null,
    '4': formState.features.length > 0,
    '5': formState.images.length > 0,
  };

  const checkIfValidByStepId = (stepId: number) => {
    return steps[stepId.toString()];
  };

  return {
    checkIfValidByStepId,
  };
};

export default useCheckStep;
