import { ROLE } from '@src/common/types/apiTypes';
import * as Yup from 'yup';

const PasswordSchema = {
  password: Yup.string().min(4, 'Too Short!').required('required'),
  passwordConfirmation: Yup.string()
    .required('required')
    .nullable()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
};

export const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const RegistrationSchema = Yup.object({
  fullName: Yup.string()
    .min(4, 'Too Short!')
    .max(20, 'Too Long!')
    .required('required'),
  role: Yup.string().oneOf(Object.values(ROLE)).defined(),
  email: Yup.string().email('Invalid email.').required('required'),
  ...PasswordSchema,
});
