import { fireEvent } from '@testing-library/react';
import DevicesByCategoryListItem from '@features/devices/components/DevicesByCategoryList/DevicesByCategoryListItem';
import useCartBtnClick from '@features/cart/hooks/useCartBtnClick';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

jest.mock('@features/cart/hooks/useCartBtnClick');

describe('[COMPONENTS]: DevicesByCategoryListItem', () => {
  const handleCartBtnClick = jest.fn();

  beforeEach(() => {
    (useCartBtnClick as jest.Mock).mockReturnValue({
      handle: handleCartBtnClick,
      hasAddedToCart: () => false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device.', () => {
    const { getByText, container } = setupAndRenderComponent({
      state: rootStateMock,
      component: DevicesByCategoryListItem,
      props: {
        device: deviceMock,
      },
    });

    const deviceTitle = getByText(deviceMock.name);

    const addToCartBtn = container.querySelector('[data-add-to-cart]');

    expect(addToCartBtn).toBeInTheDocument();

    expect(deviceTitle).toBeInTheDocument();
  });

  test('should add device to user cart on cart btn click.', () => {
    const { getByText, container } = setupAndRenderComponent({
      state: rootStateMock,
      component: DevicesByCategoryListItem,
      props: {
        device: deviceMock,
      },
    });

    const deviceTitle = getByText(deviceMock.name);

    const addToCartBtn = container.querySelector('[data-add-to-cart]') as HTMLButtonElement;

    fireEvent.click(addToCartBtn);

    expect(deviceTitle).toBeInTheDocument();
    expect(handleCartBtnClick).toBeCalledWith(deviceMock);
  });
});
