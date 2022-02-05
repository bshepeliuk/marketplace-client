import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ILocationStateProps {
  rowIndex: number;
}

const useSaveDeviceListPosition = () => {
  const location = useLocation();
  const [rowIndexState, setRowIndexState] = useState<number>(0);

  const locationState = location.state as ILocationStateProps;

  useEffect(() => {
    if (locationState?.rowIndex) {
      setRowIndexState(locationState.rowIndex);
    }
  }, []);

  return {
    rowIndexState,
  };
};

export default useSaveDeviceListPosition;
