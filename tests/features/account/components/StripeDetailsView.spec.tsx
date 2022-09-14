import StripeDetailsView from '@features/account/components/StripeDetails/StripeDetailsView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[COMPONENTS]: StripeDetailsView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('in case stripe account is disabled, should render button for activating.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: StripeDetailsView,
    });

    expect(getByText('disabled', { exact: false })).toBeInTheDocument();
    expect(getByText('activate', { exact: false })).toBeInTheDocument();
  });

  test('in case stripe account is enabled, should render message about it.', () => {
    const { getByText } = setupAndRenderComponent({
      state: { ...rootStateMock, auth: { ...rootStateMock.auth, stripeAccount: { id: 22, isActive: true } } },
      component: StripeDetailsView,
    });

    expect(getByText('enabled', { exact: false })).toBeInTheDocument();
  });
});
