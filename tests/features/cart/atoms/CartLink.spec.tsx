import { routes } from '@src/app/Router';
import CartLink from '@src/common/atoms/CartLink/CartLink';
import { deviceMock } from '../../../mocks/data';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[ATOMS]: CartLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render cart link.', () => {
    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: CartLink,
    });

    const link = container.querySelector('[data-link="cart"]') as HTMLAnchorElement;

    expect(link.getAttribute('href')).toBe(`${routes.cart}`);
  });

  test('should render cart counter.', () => {
    const items = [deviceMock, { ...deviceMock, id: deviceMock.id + 1 }];

    const { getByText } = setupAndRenderComponent({
      state: {
        ...rootStateMock,
        cart: {
          ...rootStateMock.cart,
          items,
        },
      },
      component: CartLink,
    });

    expect(getByText(items.length, { exact: true })).toBeInTheDocument();
  });
});
