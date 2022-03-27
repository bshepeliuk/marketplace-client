import { useLocation, useNavigate } from 'react-router';

const useClearLocationState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const clearLocationState = () => {
    navigate(
      { pathname: location.pathname, search: location.search },
      { replace: true, state: {} },
    );
  };

  return clearLocationState;
};

export default useClearLocationState;
