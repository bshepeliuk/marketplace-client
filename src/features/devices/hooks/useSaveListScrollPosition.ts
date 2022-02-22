import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ILocationStateProps {
  rowIndex: number;
}

const useSaveListScrollPosition = () => {
  const [rowIndexState, setRowIndexState] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as ILocationStateProps;

  const resetScrollPosition = () => {
    navigate(location.pathname, { replace: true });
  };

  useEffect(() => {
    if (locationState?.rowIndex) {
      setRowIndexState(locationState.rowIndex);
    }
  }, [locationState]);

  return {
    rowIndexState,
    resetScrollPosition,
  };
};

export default useSaveListScrollPosition;
