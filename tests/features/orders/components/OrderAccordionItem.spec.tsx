import { screen } from '@testing-library/dom';

import OrderAccordionItem from '@src/features/orders/components/OrderAccordion/components/OrderAccordionItem';
import groupByOrderId from '@src/features/orders/helpers/groupByOrderId';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { ordersMock } from '../../../mocks/data';

describe('[COMPONENTS]: OrderAccordionItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render order accordion item', () => {
    const items = groupByOrderId(ordersMock);

    const [order, devices] = items[0];

    setupAndRenderComponent({
      component: OrderAccordionItem,
      state: rootStateMock,
      props: { order, devices },
    });

    expect(screen.getByText(order.fullName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(order.phone, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(order.id, { exact: true })).toBeInTheDocument();

    for (const device of devices) {
      expect(screen.getByText(device.name, { exact: false })).toBeInTheDocument();
    }
  });
});
