import React from 'react';
import * as formik from 'formik';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginFormView from '@src/features/auth/components/LoginFormView';
import useLogin from '@src/features/auth/hooks/useLogin';

jest.mock('@src/features/auth/hooks/useLogin', () => jest.fn());

const useLoginMock = useLogin as jest.Mock;
const useFormikMock = jest.spyOn(formik, 'useFormik');

const renderLoginForm = () => {
  return render(<LoginFormView />);
};

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    useLoginMock.mockImplementation(() => {
      const onLogin = jest.fn();

      return {
        onLogin,
      };
    });

    useFormikMock.mockReturnValue({
      values: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
      errors: {
        email: '',
        password: '',
      },
      handleChange,
      handleSubmit,
    } as any);
  });

  test('check form', async () => {
    renderLoginForm();

    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'john@wick.io' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(emailInput).toBeInTheDocument();

    const loginBtn = screen.getByText('Login');
    fireEvent.submit(loginBtn);

    expect(loginBtn).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
