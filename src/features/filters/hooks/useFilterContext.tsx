import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const useFilterContext = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider.');
  }

  return context;
};

export default useFilterContext;
