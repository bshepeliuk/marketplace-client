import { ParamKeyValuePair } from 'react-router-dom';

const getActiveSearchParamsEntries = (params: URLSearchParams): ParamKeyValuePair[] => {
  return Array.from(params.entries()).filter(([key]) => {
    return ['features', 'minPrice', 'maxPrice'].includes(key);
  });
};

export default getActiveSearchParamsEntries;
