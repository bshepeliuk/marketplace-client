import DevicesByCategoryList from '@features/devices/components/DevicesByCategoryList/DevicesByCategoryList';
import { deviceMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: DevicesByCategoryList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render devices list.', async () => {
    const { getByText } = setupAndRenderComponent({
      component: DevicesByCategoryList,
      props: {
        items: [deviceMock],
        isLoading: false,
      },
      state: rootStateMock,
    });

    expect(getByText(deviceMock.name, { exact: false })).toBeInTheDocument();
  });

  test('should render list loader', async () => {
    const { getAllByText } = setupAndRenderComponent({
      component: DevicesByCategoryList,
      props: {
        items: [],
        isLoading: true,
      },
      state: rootStateMock,
    });

    expect(getAllByText('loading...', { exact: false }).length).toBeGreaterThan(0);
  });
});
