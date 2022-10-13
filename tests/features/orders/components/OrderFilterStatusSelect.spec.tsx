import selectEvent from 'react-select-event';
import { screen, waitFor } from '@testing-library/dom';
import { toast } from 'react-toastify';

import OrderStatusSelector from '@src/features/orders/atoms/OrderStatusSelector';
import { OrderStatus, ORDERS_MULTISELECT_LIMIT } from '@src/features/orders/constants';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

jest.mock('react-toastify');

describe('[COMPONENTS]: OrderStatusSelector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have order selector', async () => {
    setupAndRenderComponent({
      component: OrderStatusSelector,
      state: rootStateMock,
      props: { onFilterChange: jest.fn() },
    });

    expect(screen.getByText('Order status', { exact: false })).toBeInTheDocument();
  });

  test('should have menu with default order statuses.', async () => {
    setupAndRenderComponent({
      component: OrderStatusSelector,
      state: rootStateMock,
      props: { onFilterChange: jest.fn() },
    });

    const select = screen.getByText('Order status', { exact: false });

    await selectEvent.openMenu(select);

    for (const status of Object.values(OrderStatus)) {
      expect(screen.getByText(status, { exact: true })).toBeInTheDocument();
    }
  });

  test('should select and clear order status.', async () => {
    setupAndRenderComponent({
      component: OrderStatusSelector,
      state: rootStateMock,
      props: { onFilterChange: jest.fn() },
    });

    const select = screen.getByText('Order status', { exact: false });

    await selectEvent.select(select, OrderStatus.paid);

    const selected = screen.getByText(OrderStatus.paid, { exact: true });

    expect(selected).toBeInTheDocument();

    await selectEvent.clearAll(selected);

    expect(screen.getByText('Order status', { exact: false })).toBeInTheDocument();
  });

  test('in case selected status options equals to ORDERS_MULTISELECT_LIMIT, should show notification', async () => {
    setupAndRenderComponent({
      component: OrderStatusSelector,
      state: rootStateMock,
      props: { onFilterChange: jest.fn() },
    });

    const select = screen.getByText('Order status', { exact: false });

    await selectEvent.select(
      select,
      [OrderStatus.paid, OrderStatus.completed, OrderStatus.shipped, OrderStatus.delivered],
      {
        container: document.body,
      },
    );

    expect(toast.info).toBeCalledWith(
      `Only ${ORDERS_MULTISELECT_LIMIT} status options can be added to filter.`,
      expect.anything(),
    );
  });

  test('should call passed callback (onFilterChange) with selected options.', async () => {
    const onFilterChangeMock = jest.fn();

    setupAndRenderComponent({
      component: OrderStatusSelector,
      state: rootStateMock,
      props: { onFilterChange: onFilterChangeMock },
    });

    const select = screen.getByText('Order status', { exact: false });

    await selectEvent.select(select, OrderStatus.paid);

    const selected = screen.getByText(OrderStatus.paid, { exact: true });

    expect(selected).toBeInTheDocument();

    await waitFor(
      () => {
        expect(onFilterChangeMock).toBeCalledWith([['status', OrderStatus.paid]]);
      },
      { timeout: 1500 },
    );
  });
});
