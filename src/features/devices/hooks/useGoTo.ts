import { useLocation, useNavigate } from 'react-router-dom';

interface ILocationStateProps {
  rowIndex: number;
  from: string;
}

const useGoTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as ILocationStateProps;

  const goBack = () => {
    navigate(
      { pathname: locationState.from || '/' },
      { state: { rowIndex: locationState.rowIndex } },
    );
  };

  return {
    goBack,
  };
};

export default useGoTo;
