import UserBlockView from '@common/components/BurgerMenu/components/UserBlock/UserBlockView';
import { ROLES } from '@common/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: UserBlockView', () => {
  const user = {
    id: 2,
    fullName: 'Leam Neeson',
    role: ROLES.BUYER,
    email: 'leam@neeson.io',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render info about user.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {
        auth: {
          user,
          isLoggedIn: true,
        },
      },
      component: UserBlockView,
    });

    expect(getByText(user.fullName)).toBeInTheDocument();
    expect(getByText(user.role)).toBeInTheDocument();
    expect(getByText(user.email)).toBeInTheDocument();
  });

  test('should not render nothing when user equal to null.', () => {
    const { queryByText } = setupAndRenderComponent({
      state: {
        auth: {
          user: null,
          isLoggedIn: false,
        },
      },
      component: UserBlockView,
    });

    expect(queryByText(user.fullName)).toBeNull();
  });
});
