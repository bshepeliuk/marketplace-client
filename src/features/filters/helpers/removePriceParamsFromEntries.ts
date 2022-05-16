import { ParamKeyValuePair } from 'react-router-dom';

const removePriceParamsFromEntries = (entries: ParamKeyValuePair[]) => {
  return entries.filter(([k]) => !['minPrice', 'maxPrice'].includes(k));
};

export default removePriceParamsFromEntries;
