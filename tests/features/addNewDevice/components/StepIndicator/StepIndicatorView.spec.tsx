/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render } from '@testing-library/react';
import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import StepIndicatorView from '@features/addNewDevice/components/StepIndicator/StepIndicatorView';
import { STEP_LIST } from '@features/addNewDevice/components/StepIndicator/steps';
import { Wrapper } from '../../../../wrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: '/new',
  })),
}));

describe('[COMPONENTS]: StepIndicator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('save button should be disabled by default', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <StepIndicatorView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    for (const step of STEP_LIST) {
      expect(getByText(step.title, { exact: false })).toBeInTheDocument();
    }
  });
});
