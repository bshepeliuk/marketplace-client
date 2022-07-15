import { ROLES } from '../constants';
import { useTypedSelector } from './useTypedSelector';

const useCheckUserRole = () => {
  const { user } = useTypedSelector((state) => state.auth);

  const isSeller = user?.role === ROLES.SELLER;
  const isBuyer = user?.role === ROLES.BUYER;

  return {
    isSeller,
    isBuyer,
  };
};

export default useCheckUserRole;
