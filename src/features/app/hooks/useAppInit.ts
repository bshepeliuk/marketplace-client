import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { initialization } from '@src/features/app/appSlice';

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
