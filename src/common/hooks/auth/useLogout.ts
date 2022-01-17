import { useNavigate } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { logout } from '@src/features/auth/authSlice';
import { useAppDispatch } from '../main/useAppDispatch';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logout());
    navigate(routes.login);
  };

  return {
    onLogout,
  };
};

export default useLogout;
