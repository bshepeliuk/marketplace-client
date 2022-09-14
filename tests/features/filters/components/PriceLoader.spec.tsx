import PriceLoader from '@src/features/filters/components/PriceFilter/PriceLoader';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[COMPONENTS]: PriceLoader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render price loader.', () => {
    const { getAllByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: PriceLoader,
    });

    expect(getAllByText('loading...', { exact: false }).length).toBeGreaterThan(0);
  });
});
