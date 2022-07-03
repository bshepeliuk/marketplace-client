import React from 'react';
import { render } from '@testing-library/react';

import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import DeviceBaseInfoStepView from '@features/addNewDevice/pages/DeviceBaseInfoStepView';

import { Wrapper } from '../../../wrapper';

describe('[PAGES]: DeviceBaseInfoStepView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render base info step page.', async () => {
    const { getByText, getByLabelText } = render(
      <NewDeviceProvider>
        <DeviceBaseInfoStepView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    const titleInput = getByLabelText(/name/i);
    const priceInput = getByLabelText(/price/i);
    const quantityInput = getByLabelText(/quantity/i);

    const nextBtn = getByText(/next/i) as HTMLButtonElement;

    const link = getByText(/prev/i) as HTMLLinkElement;

    expect(titleInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();

    expect(link.getAttribute('href')).toBe('/new/device-category');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeTruthy();
  });
});
