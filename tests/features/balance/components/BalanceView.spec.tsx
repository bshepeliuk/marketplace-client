import { screen } from '@testing-library/dom';

import BalanceView from '@features/balance/components/BalanceView';
import calculateTotalBalance from '@features/balance/helpers/calculateTotalBalance';
import { formatNumber } from '@src/common/utils/formatNumber';
import convertCentsToDollars from '@src/common/utils/convertCentsToDollars';
import { IBalanceItem } from '@src/features/balance/types';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { balanceMock } from '../../../mocks/data';
import server from '../../../mocks/api/server';

describe('[COMPONENTS]: BalanceView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render current seller balance.', () => {
    const availableList = calculateTotalBalance(balanceMock.available);
    const instantAvailableList = calculateTotalBalance(balanceMock.instant_available);
    const pendingList = calculateTotalBalance(balanceMock.pending);
    const balanceList = ([] as IBalanceItem[]).concat(availableList, instantAvailableList, pendingList);

    setupAndRenderComponent({
      component: BalanceView,
      state: rootStateMock,
    });

    for (const item of balanceList) {
      const amount = formatNumber(convertCentsToDollars(item.amount));
      expect(screen.getAllByText(amount, { exact: false }).length).toBeGreaterThan(0);
    }
  });

  test('in case isLoading is true, should render loader', () => {
    setupAndRenderComponent({
      component: BalanceView,
      state: { ...rootStateMock, balance: { ...rootStateMock.balance, isLoading: true } },
    });

    expect(screen.getAllByText('Loading...', { exact: false }).length).toBeGreaterThan(0);
  });
});
