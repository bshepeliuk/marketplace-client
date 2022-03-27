import { ILogin } from '@common/types/apiTypes';
import { login } from '@src/features/auth/authSlice';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';

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
