import { useSearchParams } from 'react-router-dom';

const useGetCategoryId = () => {
  const [searchParams] = useSearchParams();

  const hasCategoryId = searchParams.get('categoryId') !== null;

  const categoryId = hasCategoryId
    ? Number(searchParams.get('categoryId'))
    : undefined;

  return categoryId;
};

export default useGetCategoryId;
