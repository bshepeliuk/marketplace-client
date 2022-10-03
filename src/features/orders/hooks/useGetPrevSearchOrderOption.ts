import { useSearchParams } from 'react-router-dom';
import { ISearchOption } from '../types';

const useGetPrevSearchOrderOption = () => {
  const [searchParams] = useSearchParams();

  const getPrevSearchOptionFromParams = (searchOptions: ISearchOption[]) => {
    const searchFields = searchOptions.map((item) => item.fieldName);

    for (const key of searchFields) {
      const hasSearchOrderParams = searchParams.has(key);

      if (hasSearchOrderParams) {
        const option = searchOptions.find((item) => item.fieldName === key);

        return option;
      }
    }
  };

  return {
    getPrevSearchOptionFromParams,
  };
};

export default useGetPrevSearchOrderOption;
