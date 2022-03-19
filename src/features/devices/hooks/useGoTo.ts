import { useLocation, useNavigate } from 'react-router-dom';

interface IFromProps {
  pathname: string;
  search: string;
}

interface ILocationStateProps {
  rowIndex: number;
  from: IFromProps;
}

const useGoTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as ILocationStateProps;

  const goBack = () => {
    const to = {
      pathname: locationState.from.pathname || '/',
      search: locationState.from.search,
    };

    const options = {
      state: { rowIndex: locationState.rowIndex },
    };

    navigate(to, options);
  };

  return {
    goBack,
  };
};

export default useGoTo;
