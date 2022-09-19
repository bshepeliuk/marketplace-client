import React from 'react';
import * as formik from 'formik';
import { render, screen } from '@testing-library/react';
import useRegister from '@src/features/auth/hooks/useRegister';
import RegisterFormView from '@src/features/auth/components/RegisterFormView';
import setupUseFormikMock from '../../../helpers/setupUseFormikMock';

jest.mock('@src/features/auth/hooks/useRegister');

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

const useFormikMock = jest.spyOn(formik, 'useFormik');

const renderRegistrationForm = () => {
  return render(<RegisterFormView />);
};

describe('RegisterForm render errors', () => {
  beforeEach(() => {
    (useRegister as jest.Mock).mockImplementation(() => ({ onRegister: jest.fn(), isLoading: false }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render error message when email is not correct.', () => {
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

    renderRegistrationForm();

    const errorMessage = screen.getByText(/Email is not correct./i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('should render error message when password is empty.', () => {
    const options = {
      values: {
        password: '',
      },
      touched: {
        password: true,
      },
      errors: {
        password: 'Password is required.',
      },
    };

    setupUseFormikMock({ mock: useFormikMock, options });

    renderRegistrationForm();

    const errorMessage = screen.getByText(/Password is required./i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('should render error message when fullName is empty.', () => {
    const options = {
      values: {
        fullName: '',
      },
      touched: {
        fullName: true,
      },
      errors: {
        fullName: 'Full name is required.',
      },
    };

    setupUseFormikMock({ mock: useFormikMock, options });

    renderRegistrationForm();

    const errorMessage = screen.getByText(/Full name is required./i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('should render error message when role is empty.', () => {
    const options = {
      values: {
        fullName: '',
      },
      touched: {
        fullName: true,
      },
      errors: {
        fullName: 'Role is required.',
      },
    };

    setupUseFormikMock({ mock: useFormikMock, options });

    renderRegistrationForm();

    const errorMessage = screen.getByText(/Role is required./i);

    expect(errorMessage).toBeInTheDocument();
  });

  test('should render error message when passwords do not match.', () => {
    const options = {
      values: {
        password: '1234',
        passwordConfirmation: '5678',
      },
      touched: {
        passwordConfirmation: true,
      },
      errors: {
        passwordConfirmation: 'Passwords must match!',
      },
    };

    setupUseFormikMock({ mock: useFormikMock, options });

    renderRegistrationForm();

    const errorMessage = screen.getByText(/Passwords must match!/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
