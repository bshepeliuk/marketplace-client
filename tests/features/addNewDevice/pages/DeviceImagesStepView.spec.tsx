import React from 'react';
import { render } from '@testing-library/react';

import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import DeviceImagesStepView from '@src/features/addNewDevice/pages/DeviceImagesStepView';

import { Wrapper } from '../../../wrapper';

describe('[PAGES]: DeviceImagesStepView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device images step page.', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <DeviceImagesStepView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    const saveBtn = getByText(/save/i) as HTMLButtonElement;

    const link = getByText(/prev/i) as HTMLLinkElement;

    expect(link.getAttribute('href')).toBe('/new/device-features');

    expect(getByText(/choose files/i)).toBeInTheDocument();

    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn.disabled).toBeTruthy();
  });
});
