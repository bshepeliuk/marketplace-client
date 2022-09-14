import React from 'react';
import { STEPS_PATHNAME } from '@features/addNewDevice/components/StepIndicator/StepIndicatorView';
import { render } from '@testing-library/react';
import NewDeviceView from '@src/features/addNewDevice/pages/NewDeviceView';
import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import { Wrapper } from '../../../wrapper';

const mockBrandFormStep = Object.keys(STEPS_PATHNAME)[0];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: mockBrandFormStep,
  })),
}));

describe('[PAGES]: NewDeviceView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render brand step form by default.', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(getByText('Please select or create device brand.', { exact: false })).toBeInTheDocument();
  });
});
