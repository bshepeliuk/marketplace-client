import { ILogin } from '@common/types/apiTypes';
import { login } from '@src/features/auth/authSlice';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';

interface ILocationState {
  from?: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as ILocationState;

  const onLogin = ({ email, password }: ILogin) => {
    dispatch(login({ email, password })).then((action) => {
      if (login.fulfilled.match(action) && locationState?.from) {
        navigate(locationState.from);
      }
    });
  };

  return {
    onLogin,
  };
};

export default useLogin;
