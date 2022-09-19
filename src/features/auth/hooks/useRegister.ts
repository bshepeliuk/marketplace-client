import { IRegister } from '@src/common/types/apiTypes';
import { register } from '@src/features/auth/authSlice';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';

const useRegister = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useTypedSelector((state) => state.auth.register);

  const onRegister = ({ email, password, fullName, role }: IRegister) => {
    return dispatch(register({ email, password, fullName, role }));
  };

  return {
    isLoading,
    onRegister,
  };
};

export default useRegister;
