import { screen } from '@testing-library/dom';

import OrdersAccordion from '@src/features/orders/components/OrderAccordion/OrderAccordion';
import groupByOrderId from '@src/features/orders/helpers/groupByOrderId';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { ordersMock } from '../../../mocks/data';

describe('[COMPONENTS]: OrdersAccordion', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render orders accordion', () => {
    const items = groupByOrderId(ordersMock);

    setupAndRenderComponent({
      component: OrdersAccordion,
      state: rootStateMock,
      props: { items, isLoading: false },
    });

    for (const [order, devices] of items) {
      expect(screen.getByText(order.id, { exact: true })).toBeInTheDocument();

      for (const device of devices) {
        expect(screen.getByText(device.name, { exact: false })).toBeInTheDocument();
      }
    }
  });

  test('should render loader', () => {
    const items = groupByOrderId(ordersMock);

    setupAndRenderComponent({
      component: OrdersAccordion,
      state: rootStateMock,
      props: { items, isLoading: true },
    });

    expect(screen.getAllByText('Loading...', { exact: false }).length).toBeGreaterThan(0);
  });
});
