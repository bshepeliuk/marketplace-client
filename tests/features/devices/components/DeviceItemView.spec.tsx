import { fireEvent } from '@testing-library/react';
import DeviceItemView from '@src/features/devices/components/DeviceItemView';
import useCartBtnClick from '@features/cart/hooks/useCartBtnClick';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

jest.mock('@features/cart/hooks/useCartBtnClick');

const styleMock = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: 100,
  height: 100,
};

describe('[COMPONENTS]: DeviceItemView', () => {
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
      component: DeviceItemView,
      props: {
        columnIndex: 0,
        rowIndex: 0,
        style: styleMock,
        data: {
          COLUMN_COUNT: 1,
          items: [deviceMock],
        },
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
      component: DeviceItemView,
      props: {
        columnIndex: 0,
        rowIndex: 0,
        style: styleMock,
        data: {
          COLUMN_COUNT: 1,
          items: [deviceMock],
        },
      },
    });

    const deviceTitle = getByText(deviceMock.name);

    const addToCartBtn = container.querySelector(
      '[data-add-to-cart]',
    ) as HTMLButtonElement;

    fireEvent.click(addToCartBtn);

    expect(deviceTitle).toBeInTheDocument();
    expect(handleCartBtnClick).toBeCalledWith(deviceMock);
  });
});
