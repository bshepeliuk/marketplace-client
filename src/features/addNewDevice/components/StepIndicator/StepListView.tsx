import React, { useEffect, useState } from 'react';
import setStepIsActiveById from '../../helpers/setStepIsActiveById';
import useCheckStep from '../../hooks/useCheckStep';
import { Circle, InnerWrap, Title } from '../../styles/stepIndicator.styled';
import { STEP_LIST } from './steps';

interface Props {
  activeStepId: number;
}

function StepListView({ activeStepId }: Props) {
  const [steps, setSteps] = useState(STEP_LIST);
  const { checkIfValidByStepId } = useCheckStep();

  useEffect(() => {
    setSteps((prev) => setStepIsActiveById({ steps: prev, id: activeStepId }));
  }, [activeStepId]);

  return (
    <>
      {steps.map((item) => {
        const Icon = checkIfValidByStepId(item.id)
          ? item.icon.completed
          : item.icon.default;

        return (
          <InnerWrap key={item.id}>
            <Circle isActive={item.isActive}>
              <Icon />
            </Circle>
            <Title isActive={item.isActive}>{item.title}</Title>
          </InnerWrap>
        );
      })}
    </>
  );
}

export default StepListView;
