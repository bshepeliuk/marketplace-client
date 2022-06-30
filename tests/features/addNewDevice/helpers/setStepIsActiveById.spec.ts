import setStepIsActiveById from '@features/addNewDevice/helpers/setStepIsActiveById';
import { STEP_LIST } from '@features/addNewDevice/components/StepIndicator/steps';

describe('[HELPERS]: setStepIsActiveById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set isActive property to true by stepId.', () => {
    const stepId = 1;
    const secondStepId = 2;

    const steps = setStepIsActiveById({ steps: STEP_LIST, id: stepId });

    const firstStep = steps.find((i) => i.id === stepId);
    const secondStep = steps.find((i) => i.id === secondStepId);

    expect(firstStep?.isActive).toBeTruthy();
    expect(secondStep?.isActive).toBeFalsy();
  });
});
