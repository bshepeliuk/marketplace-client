import * as Api from '@src/common/api/Api';

const useFetchCategories = () => {
  const fetchCategoriesBy = ({ name }: { name: string }) => {
    return Api.Categories.get({ name });
  };

  return {
    fetchCategoriesBy,
  };
};

export default useFetchCategories;
