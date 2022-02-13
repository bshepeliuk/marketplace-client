import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@src/app/Router';

interface ILocationStateProps {
  rowIndex: number;
}

const useGoHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as ILocationStateProps;

  const goHome = () => {
    navigate(routes.home, {
      state: { rowIndex: locationState.rowIndex },
    });
  };

  return {
    goHome,
  };
};

export default useGoHome;
