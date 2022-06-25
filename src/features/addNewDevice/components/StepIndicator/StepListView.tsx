import React, { useEffect, useState } from 'react';
import setStepIsActiveById from '../../helpers/setStepIsActiveById';
import { Circle, InnerWrap, Title } from '../../styles/stepIndicator.styled';
import { STEP_LIST } from './steps';

function StepListView({ activeStepId }: { activeStepId: number }) {
  const [steps, setSteps] = useState(STEP_LIST);

  useEffect(() => {
    setSteps((prev) => setStepIsActiveById({ steps: prev, id: activeStepId }));
  }, [activeStepId]);

  return (
    <>
      {steps.map((item) => {
        const Icon = item.icon;

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
