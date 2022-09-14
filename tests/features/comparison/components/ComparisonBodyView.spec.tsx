import ComparisonBodyView from '@features/comparison/components/Body/ComparisonBodyView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonTableMock } from '../../../mocks/data';

describe('[COMPONENTS]: ComparisonBodyView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render comparison rows.', () => {
    const { getAllByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonBodyView,
    });

    for (const row of comparisonTableMock.body) {
      for (const cell of row) {
        expect(getAllByText(cell.value, { exact: false }).length).toBeGreaterThan(0);
      }
    }
  });
});
