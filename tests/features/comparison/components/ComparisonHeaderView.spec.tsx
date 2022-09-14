import ComparisonHeaderView from '@features/comparison/components/Header/ComparisonHeaderView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonTableMock } from '../../../mocks/data';
import { mockStripe } from '../../../mocks/stripe';

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => mockStripe(),
}));

describe('[COMPONENTS]: ComparisonHeaderView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render comparison header rows.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonHeaderView,
    });

    for (const cell of comparisonTableMock.header) {
      if (cell.name !== undefined) {
        expect(getByText(cell.name, { exact: false })).toBeInTheDocument();
      }

      if (cell.value !== undefined) {
        expect(getByText(cell.value, { exact: false })).toBeInTheDocument();
      }
    }
  });
});
