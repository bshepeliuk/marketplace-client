import { useLocation } from 'react-router';

interface ILocationState {
  shouldRefetchDevices: boolean;
}

const useCheckIfShouldRefetchDevices = () => {
  const location = useLocation();

  const locationState = location.state as ILocationState;
  const shouldRefetchDevices = locationState
    ? locationState.shouldRefetchDevices
    : false;

  return {
    shouldRefetchDevices,
  };
};

export default useCheckIfShouldRefetchDevices;
