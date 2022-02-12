import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ILocationStateProps {
  rowIndex: number;
}

const useSaveDeviceListPosition = () => {
  const [rowIndexState, setRowIndexState] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  const resetPosition = () => navigate(location.pathname, { replace: true });

  const locationState = location.state as ILocationStateProps;

  useEffect(() => {
    if (locationState?.rowIndex) {
      setRowIndexState(locationState.rowIndex);
    }
  }, []);

  return {
    rowIndexState,
    resetPosition,
  };
};

export default useSaveDeviceListPosition;
