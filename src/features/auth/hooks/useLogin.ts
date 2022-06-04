import { ILogin } from '@common/types/apiTypes';
import { login } from '@src/features/auth/authSlice';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { persistor } from '@src/app/store';

interface ILocationState {
  from?: string;
}

const useLogin = () => {
  const { isLoading } = useTypedSelector((state) => state.auth.login);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as ILocationState;

  const onLogin = ({ email, password }: ILogin) => {
    dispatch(login({ email, password })).then((action) => {
      persistor.persist();

      if (login.fulfilled.match(action) && locationState?.from) {
        navigate(locationState.from);
      }
    });
  };

  return {
    onLogin,
    isLoading,
  };
};

export default useLogin;
