import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { addBrand } from '../brandsSlice';

const useCreateBrand = () => {
  const dispatch = useAppDispatch();
  const { isCreating, isCreatingError } = useTypedSelector(
    (state) => state.brands,
  );

  const createBrand = ({ name }: { name: string }) => {
    return dispatch(addBrand({ name }));
  };

  return {
    createBrand,
    isCreating,
    isCreatingError,
  };
};

export default useCreateBrand;
