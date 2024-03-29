import { useEffect } from 'react';
import * as Api from '@src/common/api/Api';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { initialization } from '@src/features/app/appSlice';
import { authActions } from '@src/features/auth/authSlice';
import { getBrands } from '@src/features/brands/brandsSlice';
import { getCategories } from '@src/features/categories/categoriesSlice';

const useAppInit = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector((state) => state.app);

  useEffect(() => {
    Api.Interceptors.response(() => {
      dispatch(authActions.setLoggedIn({ isLoggedIn: false }));
    });
  }, []);

  const init = () => {
    dispatch(initialization());
    dispatch(getCategories());
    dispatch(getBrands({ name: undefined }));
  };

  return {
    init,
    isLoading,
  };
};

export default useAppInit;
