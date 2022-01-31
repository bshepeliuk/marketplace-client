import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginFormView from '@src/features/auth/components/LoginFormView';
import useLogin from '@src/features/auth/hooks/useLogin';

jest.mock('@src/features/auth/hooks/useLogin');

const renderLoginForm = () => {
  return render(<LoginFormView />);
};

describe('LoginForm', () => {
  const onLoginMock = jest.fn();

  beforeEach(() => {
    (useLogin as jest.Mock).mockImplementation(() => ({
      onLogin: onLoginMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('email input', async () => {
    const { getByTestId } = renderLoginForm();

    const input = getByTestId('email') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'john@wick.io' },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('john@wick.io');
    });
  });

  test('password input', async () => {
    const { getByTestId } = renderLoginForm();

    const input = getByTestId('password') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'test-password-1234' },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('test-password-1234');
    });
  });

  test('submit login form', async () => {
    const { getByTestId, getByText } = renderLoginForm();

    const loginBtn = getByText('Login');

    const emailInput = getByTestId('email') as HTMLInputElement;
    const passwordInput = getByTestId('password') as HTMLInputElement;

    fireEvent.change(emailInput, {
      target: { value: 'tony@stark.star' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'secret-password' },
    });
    fireEvent.submit(loginBtn);

    await waitFor(() => {
      expect(emailInput.value).toBe('tony@stark.star');
      expect(passwordInput.value).toBe('secret-password');
      expect(onLoginMock).toBeCalledTimes(1);
      expect(onLoginMock).toBeCalledWith({
        email: 'tony@stark.star',
        password: 'secret-password',
      });
    });
  });
});
