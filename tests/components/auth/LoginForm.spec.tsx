import React from 'react';
import * as formik from 'formik';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginFormView from '@src/features/auth/components/LoginFormView';
import useLogin from '@src/features/auth/hooks/useLogin';

jest.mock('@src/features/auth/hooks/useLogin');

const useFormikMock = jest.spyOn(formik, 'useFormik');

const formInitialState = {
  email: '',
  password: '',
};

const renderLoginForm = () => {
  return render(<LoginFormView />);
};

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    (useLogin as jest.Mock).mockImplementation(() => ({ onLogin: jest.fn() }));

    useFormikMock.mockReturnValue({
      handleChange,
      handleSubmit,
      values: formInitialState,
      touched: {
        email: false,
        password: false,
      },
      errors: {
        email: '',
        password: '',
      },
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('email input', async () => {
    renderLoginForm();

    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'john@wick.io' } });

    expect(emailInput).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('password input', async () => {
    renderLoginForm();

    const input = screen.getByLabelText('Email');

    fireEvent.change(input, { target: { value: '1234' } });

    expect(input).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('submit login form', async () => {
    renderLoginForm();

    const loginBtn = screen.getByText('Login');

    fireEvent.submit(loginBtn);

    expect(loginBtn).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
