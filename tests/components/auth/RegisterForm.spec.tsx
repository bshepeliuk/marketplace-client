import React from 'react';
import * as formik from 'formik';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterFormView from '@src/features/auth/components/RegisterFormView';
import { ROLE } from '@src/common/types/apiTypes';
import useRegister from '@src/features/auth/hooks/useRegister';

jest.mock('@src/features/auth/hooks/useRegister');

const useFormikMock = jest.spyOn(formik, 'useFormik');

const formInitialState = {
  email: '',
  password: '',
  role: ROLE.BUYER,
  fullName: '',
  passwordConfirmation: '',
};

const renderRegistrationForm = () => {
  return render(<RegisterFormView />);
};

const setupUseFormikMock = ({
  errors = {},
  touched = {},
  values = {},
}: any) => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleBlur = jest.fn();

  useFormikMock.mockReturnValue({
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    touched,
    errors,
  } as any);
};

describe('RegistrationForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    (useRegister as jest.Mock).mockImplementation(() => ({
      onRegister: jest.fn(),
    }));

    useFormikMock.mockReturnValue({
      handleChange,
      handleSubmit,
      values: formInitialState,
      touched: {},
      errors: {},
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('email input', async () => {
    renderRegistrationForm();

    const input = screen.getByLabelText('Email');

    fireEvent.change(input, { target: { value: 'john@wick.io' } });

    expect(input).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('password input', async () => {
    renderRegistrationForm();

    const input = screen.getByLabelText('Password');

    fireEvent.change(input, { target: { value: '1234' } });

    expect(input).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('password confirmation input', async () => {
    renderRegistrationForm();

    const input = screen.getByLabelText('Password confirmation');

    fireEvent.change(input, { target: { value: '1234' } });

    expect(input).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('fullName input', async () => {
    renderRegistrationForm();

    const input = screen.getByLabelText('Full Name');

    fireEvent.change(input, { target: { value: 'John Wick' } });

    expect(input).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('role input', async () => {
    renderRegistrationForm();
    const input = screen.getByLabelText('Role');

    fireEvent.change(input, { target: { value: ROLE.SELLER } });

    expect(input).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  describe('CHECK REGISTRATION FORM STATE', () => {
    test('should return error when email is incorrect', async () => {
      setupUseFormikMock({
        values: {
          email: 'incorrect_email',
        },
        touched: {
          email: true,
        },
        errors: {
          email: 'Email is incorrect!',
        },
      });

      renderRegistrationForm();

      const errorMessage = screen.getByText('Email is incorrect!');

      expect(errorMessage).toBeInTheDocument();
    });
    // eslint-disable-next-line max-len
    test('should return error when password field touched but is not filled out', async () => {
      setupUseFormikMock({
        values: {
          password: '',
        },
        touched: {
          password: true,
        },
        errors: {
          password: 'Password is required!',
        },
      });

      renderRegistrationForm();

      const errorMessage = screen.getByText('Password is required!');

      expect(errorMessage).toBeInTheDocument();
    });
    // eslint-disable-next-line max-len
    test('should return error when fullName field touched but is not filled out', async () => {
      setupUseFormikMock({
        values: {
          fullName: '',
        },
        touched: {
          fullName: true,
        },
        errors: {
          fullName: 'fullName is required!',
        },
      });

      renderRegistrationForm();

      const errorMessage = screen.getByText('fullName is required!');

      expect(errorMessage).toBeInTheDocument();
    });
    // eslint-disable-next-line max-len
    test('should return error when fullName field touched but is not filled out', async () => {
      setupUseFormikMock({
        values: {
          role: '',
        },
        touched: {
          role: true,
        },
        errors: {
          role: 'Role is required!',
        },
      });

      renderRegistrationForm();

      const errorMessage = screen.getByText('Role is required!');

      expect(errorMessage).toBeInTheDocument();
    });
    // eslint-disable-next-line max-len
    test('should return error when fullName field touched but is not filled out', async () => {
      setupUseFormikMock({
        values: {
          password: '1234',
          passwordConfirmation: '',
        },
        touched: {
          passwordConfirmation: true,
        },
        errors: {
          passwordConfirmation: 'Passwords must match!',
        },
      });

      renderRegistrationForm();

      const errorMessage = screen.getByText('Passwords must match!');

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
