import HomeView from '@src/features/home/HomeView';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { deviceMock } from '../../../mocks/data';

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 2; // 400px - DeviceItem height, 2 - count of devices
    return children({ height, width: 1440 });
  };
});

describe('[PAGES]: HomeView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device list from state', async () => {
    const { getByText } = setupAndRenderComponent({
      component: HomeView,
      state: rootStateMock,
    });

    expect(getByText(deviceMock.name, { exact: false })).toBeInTheDocument();
  });
});
