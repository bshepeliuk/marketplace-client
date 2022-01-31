import React from 'react';
import * as formik from 'formik';
import { render, screen } from '@testing-library/react';
import LoginFormView from '@src/features/auth/components/LoginFormView';

import useLogin from '@src/features/auth/hooks/useLogin';
import { setupUseFormikMock } from '../../../helpers';

jest.mock('@src/features/auth/hooks/useLogin');

const useFormikMock = jest.spyOn(formik, 'useFormik');

const renderLoginForm = () => {
  return render(<LoginFormView />);
};

describe('LoginForm render errors', () => {
  beforeEach(() => {
    (useLogin as jest.Mock).mockImplementation(() => ({ onLogin: jest.fn() }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show error message when email is incorrect', () => {
    const options = {
      values: {
        email: 'incorrect-email',
      },
      touched: {
        email: true,
      },
      errors: {
        email: 'Email is not correct.',
      },
    };

    setupUseFormikMock({ mock: useFormikMock, options });

    renderLoginForm();

    const errorMessage = screen.getByText(/Email is not correct./i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('should show error message when email is incorrect', () => {
    const options = {
      values: {
        password: '',
      },
      touched: {
        password: true,
      },
      errors: {
        password: 'Password is not correct.',
      },
    };

    setupUseFormikMock({ mock: useFormikMock, options });

    renderLoginForm();

    const errorMessage = screen.getByText(/Password is not correct./i);

    expect(errorMessage).toBeInTheDocument();
  });
});
