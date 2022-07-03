import React from 'react';
import { render } from '@testing-library/react';

import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import DeviceFeatureStepView from '@features/addNewDevice/pages/DeviceFeatureStepView';
import { Wrapper } from '../../../wrapper';

describe('[PAGES]: DeviceFeatureStepView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render feature step page.', async () => {
    const { getByText, getByLabelText } = render(
      <NewDeviceProvider>
        <DeviceFeatureStepView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    const titleInput = getByLabelText(/title/i);
    const descriptionInput = getByLabelText(/description/i);

    const nextBtn = getByText(/next/i) as HTMLButtonElement;
    const addBtn = getByText(/add/i) as HTMLButtonElement;

    const link = getByText(/prev/i) as HTMLLinkElement;

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    expect(link.getAttribute('href')).toBe('/new/device-base-info');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeTruthy();

    expect(addBtn).toBeInTheDocument();
    expect(addBtn.disabled).toBeTruthy();
  });
});
