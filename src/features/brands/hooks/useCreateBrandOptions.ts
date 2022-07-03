import createOption from '@src/common/utils/createSelectOption';
import { IBrand } from '../types';

const useCreateBrandOptions = () => {
  const createOptionsByBrands = (brands: IBrand[]) => {
    return brands.map((brand: IBrand) => {
      return createOption(brand.name);
    });
  };

  return {
    createOptionsByBrands,
  };
};

export default useCreateBrandOptions;
