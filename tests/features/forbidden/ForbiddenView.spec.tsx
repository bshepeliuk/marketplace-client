import ForbiddenView from '@src/features/forbidden/ForbiddenView';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[PAGE]: ForbiddenView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render forbidden page.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: ForbiddenView,
    });

    expect(getByText(/forbidden/i)).toBeInTheDocument();
  });
});
