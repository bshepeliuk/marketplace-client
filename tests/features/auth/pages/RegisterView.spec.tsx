import React from 'react';
import { render } from '@testing-library/react';

import RegisterView from '@src/features/auth/components/RegisterView';
import { Wrapper } from '../../../wrapper';

describe('[PAGES]: RegisterView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render register page.', async () => {
    const { getByText, getByLabelText } = render(<RegisterView />, {
      wrapper: Wrapper,
    });

    const link = getByText(/go to login/i) as HTMLLinkElement;
    const registerBtn = getByText(/register/i) as HTMLButtonElement;

    expect(link.getAttribute('href')).toBe('/auth/login');

    expect(registerBtn).toBeInTheDocument();
    expect(registerBtn.disabled).toBeTruthy();

    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/full name/i)).toBeInTheDocument();
    expect(getByLabelText(/role/i)).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Password confirmation')).toBeInTheDocument();
  });
});
