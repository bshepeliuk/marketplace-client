import { useContext } from 'react';
import { NewDeviceContext } from '../context/NewDeviceContext';

const useNewDeviceContext = () => {
  const context = useContext(NewDeviceContext);

  if (context === undefined) {
    throw new Error(
      'useNewDeviceContext must be used within a NewDeviceProvider.',
    );
  }

  return context;
};

export default useNewDeviceContext;
