import React from 'react';
import { render } from '@testing-library/react';
import AuthView from '@src/features/auth/pages/AuthView';
import { Wrapper } from '../../../wrapper';

describe('[PAGES]: AuthView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render login page by default.', async () => {
    const { getByText, getByLabelText } = render(<AuthView />, {
      wrapper: Wrapper,
    });

    const link = getByText(/go to registration/i) as HTMLLinkElement;
    expect(link.getAttribute('href')).toBe('/auth/register');

    const loginBtn = getByText(/login/i) as HTMLButtonElement;

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.disabled).toBeTruthy();

    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });
});
