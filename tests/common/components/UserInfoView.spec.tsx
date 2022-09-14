import UserInfoView from '@src/common/components/UserInfo/UserInfoView';
import { fireEvent } from '@testing-library/dom';
import { rootStateMock } from '../../mocks/stateMock';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';
import { userMock } from '../../mocks/data';

describe('[COMPONENTS]: UserInfoView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render user logo', async () => {
    const { getByText } = setupAndRenderComponent({
      component: UserInfoView,
      state: rootStateMock,
    });

    expect(getByText(userMock.fullName[0], { exact: false })).toBeInTheDocument();
  });

  test('should not render user logo when isLoggedIn is equal to false.', async () => {
    const { queryByText } = setupAndRenderComponent({
      component: UserInfoView,
      state: { ...rootStateMock, auth: { ...rootStateMock.auth, isLoggedIn: false } },
    });

    expect(queryByText(userMock.fullName[0], { exact: false })).toBeNull();
  });

  test('should render full info about user.', async () => {
    const { container, getByText } = setupAndRenderComponent({
      component: UserInfoView,
      state: rootStateMock,
    });

    const userInfoButton = container.querySelector('[data-button="user-info"]') as HTMLElement;

    fireEvent.click(userInfoButton);

    expect(getByText(userMock.fullName, { exact: false })).toBeInTheDocument();
    expect(getByText(userMock.role, { exact: false })).toBeInTheDocument();
  });
});
