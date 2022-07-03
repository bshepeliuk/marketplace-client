import { IStep } from '../components/StepIndicator/steps';

const setStepIsActiveById = ({ steps, id }: { steps: IStep[]; id: number }) => {
  return steps.map((item) => {
    if (item.id === id && !item.isActive) {
      return {
        ...item,
        isActive: true,
      };
    }

    return { ...item, isActive: false };
  });
};

export default setStepIsActiveById;
