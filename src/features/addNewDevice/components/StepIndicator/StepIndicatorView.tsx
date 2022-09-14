import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProgressLine, Wrap } from '../../styles/stepIndicator.styled';
import StepListView from './StepListView';
import { STEP_LIST } from './steps';

const MAX_WIDTH_IN_PERCENT = 99;
const ONE_STEP_WIDTH = MAX_WIDTH_IN_PERCENT / (STEP_LIST.length - 1);

export const STEPS_PATHNAME: Record<string, number> = {
  '/new': 1,
  '/new/device-category': 2,
  '/new/device-base-info': 3,
  '/new/device-features': 4,
  '/new/device-images': 5,
};

function StepIndicatorView() {
  const location = useLocation();
  const [width, setWidth] = useState(0);
  const [activeStepId, setActiveStepId] = useState(1);

  useEffect(() => {
    setActiveStepId(STEPS_PATHNAME[location.pathname]);

    const CURRENT_PROGRESS_WIDTH = ONE_STEP_WIDTH * STEPS_PATHNAME[location.pathname];
    const NEXT_PROGRESS_WIDTH = CURRENT_PROGRESS_WIDTH - ONE_STEP_WIDTH;

    setWidth(NEXT_PROGRESS_WIDTH);
  }, [location.pathname]);

  return (
    <Wrap>
      <ProgressLine width={width} />
      <StepListView activeStepId={activeStepId} />
    </Wrap>
  );
}

export default StepIndicatorView;
