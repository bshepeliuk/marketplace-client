import React from 'react';
import * as formik from 'formik';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterFormView from '@src/features/auth/components/RegisterFormView';
import useRegister from '@src/features/auth/hooks/useRegister';
import { ROLE } from '@src/common/types/apiTypes';

jest.mock('@src/features/auth/hooks/useRegister');
jest.spyOn(formik, 'useFormik');

const renderRegistrationForm = () => {
  return render(<RegisterFormView />);
};

describe('RegistrationForm', () => {
  const onRegisterMock = jest.fn();

  beforeEach(() => {
    (useRegister as jest.Mock).mockImplementation(() => ({
      onRegister: onRegisterMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('email input', async () => {
    const { getByTestId } = renderRegistrationForm();

    const input = getByTestId('email') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'leam@neeson.star' },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('leam@neeson.star');
    });
  });

  test('password input', async () => {
    const { getByTestId } = renderRegistrationForm();

    const input = getByTestId('password') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'super-password' },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('super-password');
    });
  });

  test('password confirmation input', async () => {
    const { getByTestId } = renderRegistrationForm();

    const input = getByTestId('passwordConfirmation') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'super-password-confirmation' },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('super-password-confirmation');
    });
  });

  test('fullName input', async () => {
    const { getByTestId } = renderRegistrationForm();

    const input = getByTestId('fullName') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'Leam Neeson' },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('Leam Neeson');
    });
  });

  test('role input', async () => {
    const { getByTestId } = renderRegistrationForm();

    const input = getByTestId('role') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: ROLE.SELLER },
    });

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input.value).toBe(ROLE.SELLER);
    });
  });

  test('submit registration form', async () => {
    const { getByTestId, getByText } = renderRegistrationForm();

    const emailInput = getByTestId('email') as HTMLInputElement;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    const passwordConfirmationInput = getByTestId(
      'passwordConfirmation',
    ) as HTMLInputElement;
    const fullNameInput = getByTestId('fullName') as HTMLInputElement;
    const roleInput = getByTestId('role') as HTMLInputElement;

    const registrationBtn = getByText('Register');

    fireEvent.change(emailInput, {
      target: { value: 'leam@neeson.star' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password-must-match' },
    });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: 'password-must-match' },
    });
    fireEvent.change(roleInput, {
      target: { value: ROLE.SELLER },
    });
    fireEvent.change(fullNameInput, {
      target: { value: 'Leam Neeson' },
    });

    fireEvent.submit(registrationBtn);

    await waitFor(() => {
      expect(onRegisterMock).toBeCalledTimes(1);
      expect(passwordInput.value).toBe(passwordConfirmationInput.value);
      expect(onRegisterMock).toBeCalledWith({
        email: emailInput.value,
        fullName: fullNameInput.value,
        role: roleInput.value,
        password: passwordInput.value,
      });
    });
  });
});
