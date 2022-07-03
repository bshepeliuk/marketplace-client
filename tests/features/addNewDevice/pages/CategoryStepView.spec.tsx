import React from 'react';
import { render } from '@testing-library/react';

import { NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import CategoryStepView from '@src/features/addNewDevice/pages/CategoryStepView';

import { Wrapper } from '../../../wrapper';

describe('[PAGES]: CategoryStepView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render category step page.', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <CategoryStepView />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(
      getByText('Please select or create device category.', { exact: false }),
    ).toBeInTheDocument();

    const nextBtn = getByText(/next/i) as HTMLButtonElement;

    const link = getByText(/prev/i) as HTMLLinkElement;

    expect(link.getAttribute('href')).toBe('/new');

    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeTruthy();
  });
});
