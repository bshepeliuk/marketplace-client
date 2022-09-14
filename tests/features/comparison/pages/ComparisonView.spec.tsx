import ComparisonView from '@src/features/comparison/pages/ComparisonView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonTableMock } from '../../../mocks/data';
import { mockStripe } from '../../../mocks/stripe';

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => mockStripe(),
}));

describe('[PAGES]: ComparisonView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render comparison table.', () => {
    const { getAllByText, getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonView,
    });

    for (const row of comparisonTableMock.body) {
      for (const cell of row) {
        expect(getAllByText(cell.value, { exact: false }).length).toBeGreaterThan(0);
      }
    }

    for (const cell of comparisonTableMock.header) {
      if (cell.name !== undefined) {
        expect(getByText(cell.name, { exact: false })).toBeInTheDocument();
      }

      if (cell.value !== undefined) {
        expect(getByText(cell.value, { exact: false })).toBeInTheDocument();
      }
    }
  });

  test('in case comparison list is empty, should render message about it.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {
        ...rootStateMock,
        comparison: {
          ...rootStateMock.comparison,
          items: [],
        },
      },
      component: ComparisonView,
    });

    expect(getByText('You have not added devices for comparison yet', { exact: false })).toBeInTheDocument();
  });
});
