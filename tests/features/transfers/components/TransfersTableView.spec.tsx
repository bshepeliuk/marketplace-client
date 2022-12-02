import { screen } from '@testing-library/dom';

import TransfersTableView from '@src/features/transfers/components/TransfersTable/TransfersTableView';
import { formatNumber } from '@src/common/utils/formatNumber';
import convertCentsToDollars from '@src/common/utils/convertCentsToDollars';
import getCurrencySymbol from '@src/common/utils/getCurrencySymbol';
import getFormattedDateBySeconds from '@src/common/utils/getFormattedDateBySeconds';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { transfersMock } from '../../../mocks/data';

describe('[COMPONENTS]: TransfersTableView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render transfers table', () => {
    setupAndRenderComponent({
      component: TransfersTableView,
      state: rootStateMock,
    });

    for (const charge of transfersMock) {
      const amountInDollars = formatNumber(convertCentsToDollars(charge.amount));
      const amount = `${getCurrencySymbol(charge.currency)} ${amountInDollars}`;
      expect(screen.getByText(amount, { exact: false })).toBeInTheDocument();

      expect(screen.getByText(charge.status, { exact: false })).toBeInTheDocument();

      expect(screen.getByText(getFormattedDateBySeconds(charge.created), { exact: false })).toBeInTheDocument();

      expect(screen.getByText(getFormattedDateBySeconds(charge.arrival_date), { exact: false })).toBeInTheDocument();
    }
  });
});
