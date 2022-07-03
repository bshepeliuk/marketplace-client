import createOption from '@src/common/utils/createSelectOption';
import { ICategory } from '../types';

const useCreateCategoryOptions = () => {
  const createCategoryOptions = (categories: ICategory[]) => {
    return categories.map((category) => createOption(category.name));
  };

  return {
    createCategoryOptions,
  };
};

export default useCreateCategoryOptions;
