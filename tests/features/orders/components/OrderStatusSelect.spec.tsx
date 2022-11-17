import selectEvent from 'react-select-event';
import { screen } from '@testing-library/dom';

import OrderStatusSelect from '@src/features/orders/components/OrderAccordion/components/OrderStatusSelect';
import { ordersActions } from '@src/features/orders/ordersSlice';
import { OrderStatus } from '@src/features/orders/constants';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import server from '../../../mocks/api/server';

const updateOrderStatusAction = jest.spyOn(ordersActions, 'updateOrderStatus');

describe('[COMPONENTS]: OrderStatusSelect', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should change order status on select.', async () => {
    const { orderDevice } = rootStateMock.orders.items[0].devices[0];

    setupAndRenderComponent({
      component: OrderStatusSelect,
      state: rootStateMock,
      props: { defaultValue: orderDevice.status, orderDeviceId: orderDevice.id },
    });

    const selector = screen.getByText(orderDevice.status, { exact: false });
    expect(selector).toBeInTheDocument();

    await selectEvent.select(selector, OrderStatus.completed);

    expect(updateOrderStatusAction).toBeCalledWith({ id: orderDevice.id, status: OrderStatus.completed });
    expect(screen.getByText(OrderStatus.completed, { exact: false })).toBeInTheDocument();
  });

  test('should have menu with order statuses.', async () => {
    const { orderDevice } = rootStateMock.orders.items[0].devices[0];

    setupAndRenderComponent({
      component: OrderStatusSelect,
      state: rootStateMock,
      props: { defaultValue: orderDevice.status, orderDeviceId: orderDevice.id },
    });

    const selector = screen.getByText(orderDevice.status, { exact: false });
    expect(selector).toBeInTheDocument();

    await selectEvent.openMenu(selector);

    for (const status of Object.values(OrderStatus)) {
      if (orderDevice.status === status) return;

      expect(screen.getByText(status, { exact: true })).toBeInTheDocument();
    }
  });
});
