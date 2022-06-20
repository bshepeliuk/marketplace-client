import AuthHeaderView from '@src/features/auth/components/AuthHeaderView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: AuthHeaderView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render auth header', async () => {
    const { getByText } = setupAndRenderComponent({
      component: AuthHeaderView,
      state: {},
    });

    const HomeLink = getByText(/marketplace/i);

    expect(HomeLink.getAttribute('href')).toBe('/');
    expect(HomeLink).toBeInTheDocument();
  });
});
