import { useNavigate } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { logout } from '@src/features/auth/authSlice';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { persistor } from '@src/app/store';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    localStorage.removeItem('persist:auth');
    persistor.pause();

    await dispatch(logout());
    navigate(routes.login);
  };

  return {
    onLogout,
  };
};

export default useLogout;
