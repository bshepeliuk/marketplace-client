import { fireEvent, screen } from '@testing-library/dom';
import * as ReactRedux from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import OrdersFilter from '@src/features/orders/components/OrdersFilter';
import { months } from '@common/components/MonthFilter/MonthFilter';
import { getOrders } from '@src/features/orders/ordersSlice';
import { FIRST_ORDER_PAGINATION_PAGE, ORDERS_LIMIT } from '@src/features/orders/constants';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest.fn().mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

jest.mock('@src/features/orders/ordersSlice', () => ({
  ...jest.requireActual('@src/features/orders/ordersSlice'),
  __esModule: true,
  getOrders: jest.fn(),
}));

describe('[COMPONENTS]: OrdersFilter', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    useDispatchMock.mockReturnValue(jest.fn());
  });

  test('should render order filters.', () => {
    setupAndRenderComponent({
      component: OrdersFilter,
      state: rootStateMock,
    });

    for (const month of months) {
      expect(screen.getByText(month, { exact: true })).toBeInTheDocument();
    }

    expect(screen.getByText('Order status', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Select order year.', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('sort by', { exact: false })).toBeInTheDocument();
  });

  test('should get orders by month filter.', () => {
    const page = 4;

    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(`?page=${page}`), jest.fn()]);

    setupAndRenderComponent({
      component: OrdersFilter,
      state: rootStateMock,
    });

    const monthFilterBtn = screen.getByText('Jan', { exact: false });
    expect(monthFilterBtn).toBeInTheDocument();

    fireEvent.click(monthFilterBtn);

    const offset = (page - FIRST_ORDER_PAGINATION_PAGE) * ORDERS_LIMIT;

    expect(getOrders).toBeCalledWith({ filters: [['month', '1']], limit: ORDERS_LIMIT, offset });
  });

  test('in case page params less than zero, offset should be equal zero.', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(`?page=${0}`), jest.fn()]);

    setupAndRenderComponent({
      component: OrdersFilter,
      state: rootStateMock,
    });

    const monthFilterBtn = screen.getByText('Jan', { exact: false });
    expect(monthFilterBtn).toBeInTheDocument();

    fireEvent.click(monthFilterBtn);

    expect(getOrders).toBeCalledWith({ filters: [['month', '1']], limit: ORDERS_LIMIT, offset: 0 });
  });
});
