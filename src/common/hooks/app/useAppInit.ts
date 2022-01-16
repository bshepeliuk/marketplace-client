import { initialization } from '@src/features/app/appSlice';
import { useAppDispatch } from '../main/useAppDispatch';
import { useTypedSelector } from '../main/useTypedSelector';

const useAppInit = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector((state) => state.app);

  const init = () => dispatch(initialization());

  return {
    init,
    isLoading,
  };
};

export default useAppInit;
