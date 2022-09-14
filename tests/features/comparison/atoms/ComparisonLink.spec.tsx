import { routes } from '@src/app/Router';
import ComparisonLink from '@common/atoms/ComparisonLink/ComparisonLink';
import { comparisonItemsMock } from '../../../mocks/data';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[ATOMS]: ComparisonLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render comparison link.', () => {
    const { container, getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonLink,
    });

    const link = container.querySelector('[data-link="comparison"]') as HTMLAnchorElement;

    expect(link.getAttribute('href')).toBe(`${routes.comparison}`);
    expect(getByText(comparisonItemsMock.length, { exact: true })).toBeInTheDocument();
  });

  test('should not render comparison link counter when comparison list is empty.', () => {
    const { queryByText } = setupAndRenderComponent({
      state: { ...rootStateMock, comparison: { ...rootStateMock.comparison, items: [] } },
      component: ComparisonLink,
    });

    expect(queryByText(comparisonItemsMock.length, { exact: true })).toBeNull();
  });
});
