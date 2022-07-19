import AddDeviceIcon from '@src/common/atoms/AddDeviceIcon/AddDeviceIcon';
import { screen } from '@testing-library/dom';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[ATOMS]: AddDeviceIcon', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render link for add device page.', () => {
    setupAndRenderComponent({
      state: {},
      component: AddDeviceIcon,
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/new');
  });
});
