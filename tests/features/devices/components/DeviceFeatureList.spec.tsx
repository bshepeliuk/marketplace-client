import DeviceFeatureList from '@features/devices/components/DeviceFeatureList';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[COMPONENTS]: DeviceFeatureList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render features list', () => {
    const featureMock = { id: 1, title: 'RAM', description: '64 GB' };

    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: DeviceFeatureList,
      props: {
        alt: 'ASUS 17',
        features: [featureMock],
      },
    });

    expect(getByText(featureMock.title, { exact: false })).toBeInTheDocument();
    expect(
      getByText(featureMock.description, { exact: false }),
    ).toBeInTheDocument();
  });
});
