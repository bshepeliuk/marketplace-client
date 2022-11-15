import * as reactRedux from 'react-redux';
import { screen } from '@testing-library/dom';

import OrdersView from '@src/features/orders/pages/OrdersView';
import { months } from '@src/common/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { ordersMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

describe('[PAGES]: DevicesByCategoryView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render orders from state', () => {
    setupAndRenderComponent({
      component: OrdersView,
      state: rootStateMock,
    });

    for (const order of ordersMock) {
      expect(screen.getAllByText(order.fullName, { exact: false }).length).toBeGreaterThan(0);
    }
  });

  test('should render month filter', () => {
    setupAndRenderComponent({
      component: OrdersView,
      state: rootStateMock,
    });

    for (const month of months) {
      expect(screen.getByText(month, { exact: true })).toBeInTheDocument();
    }
  });

  test('should have pagination when total value greater than ORDER_LIMIT', () => {
    const { container } = setupAndRenderComponent({
      component: OrdersView,
      state: { ...rootStateMock, orders: { ...rootStateMock.orders, total: 60 } },
    });

    const paginationList = container.querySelector('[data-pagination-list="pagination-list"]') as HTMLUListElement;

    expect(paginationList).toBeInTheDocument();
  });
});
