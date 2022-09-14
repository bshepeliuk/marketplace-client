import AccountView from '@src/features/account/pages/AccountView';
import { userMock } from '../../../mocks/data';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[PAGES]: AccountView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render info about user account.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: AccountView,
    });

    expect(getByText(userMock.fullName, { exact: false })).toBeInTheDocument();
    expect(getByText(userMock.role, { exact: false })).toBeInTheDocument();
  });
});
