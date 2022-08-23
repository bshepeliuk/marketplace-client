import ErrorMessageView from '@src/common/components/ErrorMessageView';
import { rootStateMock } from '../../mocks/stateMock';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: ErrorMessageView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render error message.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: ErrorMessageView,
    });

    expect(
      getByText(/Unfortunately something went wrong. Kindly try again later./i),
    ).toBeInTheDocument();
  });
});
