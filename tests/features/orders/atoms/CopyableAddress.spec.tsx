import { fireEvent, screen } from '@testing-library/dom';

import CopyableAddress from '@src/features/orders/atoms/CopyableAddress';
import groupByOrderId from '@src/features/orders/helpers/groupByOrderId';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { ordersMock } from '../../../mocks/data';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('[ATOMS]: CopyableAddress', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render copyable address.', () => {
    const items = groupByOrderId(ordersMock);

    const [order] = items[0];

    setupAndRenderComponent({
      component: CopyableAddress,
      state: rootStateMock,
      props: { address: order.address },
    });

    expect(screen.getByText(order.address.country, { exact: false })).toBeInTheDocument();
  });

  test('should copy address.', () => {
    const items = groupByOrderId(ordersMock);

    const [{ address }] = items[0];

    const addressForCopy = `${address.country}, ${address.city}, ${address.state}, ${address.line1}, ${address.line2}`;

    const { container } = setupAndRenderComponent({
      component: CopyableAddress,
      state: rootStateMock,
      props: { address },
    });

    const button = container.querySelector('button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toBeCalledWith(addressForCopy);
  });

  test('in case address equals to null, should render dash', () => {
    setupAndRenderComponent({
      component: CopyableAddress,
      state: rootStateMock,
      props: { address: null },
    });

    expect(screen.getByText('-', { exact: true })).toBeInTheDocument();
  });
});
