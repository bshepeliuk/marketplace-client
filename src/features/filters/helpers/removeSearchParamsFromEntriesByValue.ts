import { ParamKeyValuePair } from 'react-router-dom';

const removeSearchParamsFromEntriesByValue = (
  params: URLSearchParams,
  value: string,
): ParamKeyValuePair[] => {
  return Array.from(params.entries()).filter(([, v]) => !v.includes(value));
};

export default removeSearchParamsFromEntriesByValue;
