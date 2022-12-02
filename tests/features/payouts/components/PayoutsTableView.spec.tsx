import { screen } from '@testing-library/dom';

import PayoutsTableView from '@src/features/payouts/components/PayoutsTable/PayoutsTableView';
import { formatNumber } from '@src/common/utils/formatNumber';
import convertCentsToDollars from '@src/common/utils/convertCentsToDollars';
import getCurrencySymbol from '@src/common/utils/getCurrencySymbol';
import getFormattedDateBySeconds from '@src/common/utils/getFormattedDateBySeconds';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { payoutsMock } from '../../../mocks/data';

describe('[COMPONENTS]: PayoutsTableView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render payouts table', () => {
    setupAndRenderComponent({
      component: PayoutsTableView,
      state: rootStateMock,
    });

    for (const charge of payoutsMock) {
      const amountInDollars = formatNumber(convertCentsToDollars(charge.amount));
      const amount = `${getCurrencySymbol(charge.currency)} ${amountInDollars}`;
      expect(screen.getByText(amount, { exact: false })).toBeInTheDocument();

      expect(screen.getByText(charge.status, { exact: false })).toBeInTheDocument();

      expect(screen.getByText(getFormattedDateBySeconds(charge.created), { exact: false })).toBeInTheDocument();

      expect(screen.getByText(getFormattedDateBySeconds(charge.arrival_date), { exact: false })).toBeInTheDocument();
    }
  });
});
