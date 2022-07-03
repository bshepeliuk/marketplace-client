import React from 'react';
import { render } from '@testing-library/react';

import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import BrandStepView from '@src/features/addNewDevice/pages/BrandStepView';

import { Wrapper } from '../../../wrapper';

describe('[PAGES]: BrandStepView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render brand step page.', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <BrandStepView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(
      getByText('Please select or create device brand.', { exact: false }),
    ).toBeInTheDocument();

    const nextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeTruthy();
  });
});
