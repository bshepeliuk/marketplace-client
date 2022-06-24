import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { addCategory } from '../categoriesSlice';

const useCreateCategory = () => {
  const dispatch = useAppDispatch();

  const createCategory = ({ name }: { name: string }) => {
    return dispatch(addCategory({ name }));
  };

  return {
    createCategory,
  };
};

export default useCreateCategory;
