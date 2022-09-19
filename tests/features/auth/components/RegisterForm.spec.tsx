import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RegisterFormView from '@src/features/auth/components/RegisterFormView';
import useRegister from '@src/features/auth/hooks/useRegister';
import selectEvent from 'react-select-event';
import { ROLES } from '@src/common/constants';
import { routes } from '@src/app/Router';

jest.mock('@src/features/auth/hooks/useRegister');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

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

    const roleInput = getByTestId('role') as HTMLInputElement;

    fireEvent.change(roleInput, {
      target: { value: ROLES.SELLER },
    });

    await waitFor(() => {
      expect(roleInput).toBeInTheDocument();
      expect(roleInput.value).toBe(ROLES.SELLER);
    });
  });

  test('submit registration form', async () => {
    const { getByTestId, getByText } = renderRegistrationForm();

    const emailInput = getByTestId('email') as HTMLInputElement;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    const passwordConfirmationInput = getByTestId('passwordConfirmation') as HTMLInputElement;
    const fullNameInput = getByTestId('fullName') as HTMLInputElement;

    const registrationBtn = getByText(/Register/i);

    fireEvent.change(emailInput, {
      target: { value: 'leam@neeson.star' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password-must-match' },
    });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: 'password-must-match' },
    });
    fireEvent.change(fullNameInput, {
      target: { value: 'Leam Neeson' },
    });

    const select = screen.getByTestId('role');

    const options = {
      value: ROLES.SELLER,
      label: 'seller',
    };

    await selectEvent.select(select, options.label);

    fireEvent.submit(registrationBtn);

    await waitFor(() => {
      expect(onRegisterMock).toBeCalledTimes(1);
      expect(passwordInput.value).toBe(passwordConfirmationInput.value);
      expect(onRegisterMock).toBeCalledWith({
        email: emailInput.value,
        fullName: fullNameInput.value,
        role: options.value,
        password: passwordInput.value,
      });
      expect(mockNavigate).toBeCalledWith(routes.login);
    });
  });
});
