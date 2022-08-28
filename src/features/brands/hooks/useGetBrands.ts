import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getBrands } from '../brandsSlice';

const useGetBrands = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, isError } = useTypedSelector(
    (state) => state.brands,
  );

  const hasNoBrands = items.length === 0;

  useEffect(() => {
    if (hasNoBrands) {
      dispatch(getBrands({ name: undefined }));
    }
  }, []);

  return {
    items,
    isLoading,
    isError,
  };
};

export default useGetBrands;
