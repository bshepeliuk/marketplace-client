// eslint-disable-next-line max-len
import DevicesByCategoryListLoader from '@features/devices/components/DevicesByCategoryList/DevicesByCategoryListLoader';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[COMPONENTS]: DevicesByCategoryListLoader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render devices loader.', () => {
    const { getAllByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: DevicesByCategoryListLoader,
    });

    expect(getAllByText('loading...', { exact: false }).length).toBeGreaterThan(0);
  });
});
