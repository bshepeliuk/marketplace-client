import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IDevice } from '@src/features/devices/types';
import { cartActions } from '../cartSlice';

const useCartBtnClick = () => {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector((state) => state.cart);

  const handle = (device: IDevice) => {
    if (hasAddedToCart(device)) {
      remove(device);
    } else {
      add(device);
    }
  };

  const add = (device: IDevice) => {
    dispatch(cartActions.addToCart({ device }));
  };

  const remove = (device: IDevice) => {
    dispatch(cartActions.removeFromCart({ device }));
  };

  const hasAddedToCart = (device: IDevice) => {
    if (!device) return false;

    return items.some((i) => i.id === device.id);
  };

  return {
    handle,
    hasAddedToCart,
  };
};

export default useCartBtnClick;
