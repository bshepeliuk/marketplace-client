import * as Api from '@src/common/api/Api';

const useFetchBrands = () => {
  const fetchByFilters = ({ name }: { name: string }) => {
    return Api.Brands.get({ name });
  };

  return {
    fetchByFilters,
  };
};

export default useFetchBrands;
