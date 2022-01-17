import { ILogin } from '@src/common/types/api';
import { login } from '@src/features/auth/authSlice';
import { useAppDispatch } from '../main/useAppDispatch';

const useLogin = () => {
  const dispatch = useAppDispatch();

  const onLogin = ({ email, password }: ILogin) => {
    dispatch(login({ email, password }));
  };

  return {
    onLogin,
  };
};

export default useLogin;
