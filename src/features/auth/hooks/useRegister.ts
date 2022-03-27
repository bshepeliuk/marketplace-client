import { IRegister } from '@src/common/types/apiTypes';
import { register } from '@src/features/auth/authSlice';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';

const useRegister = () => {
  const dispatch = useAppDispatch();

  const onRegister = ({ email, password, fullName, role }: IRegister) => {
    dispatch(register({ email, password, fullName, role }));
  };

  return {
    onRegister,
  };
};

export default useRegister;
