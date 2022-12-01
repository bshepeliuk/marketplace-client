import { screen } from '@testing-library/dom';

import ChargesTableView from '@features/charges/components/ChargesTable/ChargesTableView';
import { formatNumber } from '@src/common/utils/formatNumber';
import convertCentsToDollars from '@src/common/utils/convertCentsToDollars';
import getCurrencySymbol from '@src/common/utils/getCurrencySymbol';
import getFormattedDateBySeconds from '@src/common/utils/getFormattedDateBySeconds';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { chargesMock } from '../../../mocks/data';

describe('[COMPONENTS]: ChargesTableView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render charges table', () => {
    setupAndRenderComponent({
      component: ChargesTableView,
      state: rootStateMock,
    });

    for (const charge of chargesMock) {
      const amountInDollars = formatNumber(convertCentsToDollars(charge.amount));
      const amount = `${getCurrencySymbol(charge.currency)} ${amountInDollars}`;
      expect(screen.getByText(amount, { exact: false })).toBeInTheDocument();

      expect(screen.getByText(charge.status, { exact: false })).toBeInTheDocument();

      expect(screen.getByText(getFormattedDateBySeconds(charge.created), { exact: false })).toBeInTheDocument();

      expect(screen.getByText(charge.id, { exact: false })).toBeInTheDocument();
    }
  });
});
