import * as Api from '@src/common/api/Api';

interface IProps {
  name: string;
}

const useFetchBrands = () => {
  const fetchByFilters = ({ name }: IProps) => {
    return Api.Brands.get({ name });
  };

  return {
    fetchByFilters,
  };
};

export default useFetchBrands;
