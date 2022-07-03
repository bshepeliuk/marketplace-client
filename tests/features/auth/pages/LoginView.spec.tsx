import React from 'react';
import { render } from '@testing-library/react';

import LoginView from '@features/auth/components/LoginView';
import { Wrapper } from '../../../wrapper';

describe('[PAGES]: LoginView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render login page.', async () => {
    const { getByText, getByLabelText } = render(<LoginView />, {
      wrapper: Wrapper,
    });

    const link = getByText(/go to registration/i) as HTMLLinkElement;
    const loginBtn = getByText(/login/i) as HTMLButtonElement;

    expect(link.getAttribute('href')).toBe('/auth/register');

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.disabled).toBeTruthy();

    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });
});
