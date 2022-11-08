import { fireEvent, screen } from '@testing-library/dom';
import * as ReactRedux from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { months } from '@common/components/MonthFilter/MonthFilter';
import { getPurchases } from '@src/features/purchases/purchasesSlice';
import PurchasesFilter from '@src/features/purchases/components/PurchasesFilter';
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

jest.mock('@src/features/purchases/purchasesSlice', () => ({
  ...jest.requireActual('@src/features/purchases/purchasesSlice'),
  __esModule: true,
  getPurchases: jest.fn(),
}));

describe('[COMPONENTS]: PurchasesFilter', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    useDispatchMock.mockReturnValue(jest.fn());
  });

  test('should render purchases filters.', () => {
    setupAndRenderComponent({
      component: PurchasesFilter,
      state: rootStateMock,
    });

    for (const month of months) {
      expect(screen.getByText(month, { exact: true })).toBeInTheDocument();
    }

    expect(screen.getByText('Order status', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Select order year.', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('sort by', { exact: false })).toBeInTheDocument();
  });

  test('should get purchases by month filter.', () => {
    const firstMonth = months[0];
    const firstMonthIdx = 1;
    const page = 4;

    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(`?page=${page}`), jest.fn()]);

    setupAndRenderComponent({
      component: PurchasesFilter,
      state: rootStateMock,
    });

    const monthFilterBtn = screen.getByText(firstMonth);
    expect(monthFilterBtn).toBeInTheDocument();

    fireEvent.click(monthFilterBtn);

    expect(getPurchases).toBeCalledWith({
      filters: [['month', String(firstMonthIdx)]],
      limit: ORDERS_LIMIT,
      offset: 0,
    });
  });

  test('in case page params less than zero, offset should be equal zero.', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(`?page=${0}`), jest.fn()]);

    const firstMonth = months[0];
    const firstMonthIdx = 1;

    setupAndRenderComponent({
      component: PurchasesFilter,
      state: rootStateMock,
    });

    const monthFilterBtn = screen.getByText(firstMonth);
    expect(monthFilterBtn).toBeInTheDocument();

    fireEvent.click(monthFilterBtn);

    expect(getPurchases).toBeCalledWith({
      filters: [['month', String(firstMonthIdx)]],
      limit: ORDERS_LIMIT,
      offset: 0,
    });
  });
});
