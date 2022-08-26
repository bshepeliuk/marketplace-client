import AddDeviceLink from '@src/common/atoms/AddDeviceLink/AddDeviceLink';
import { screen } from '@testing-library/dom';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[ATOMS]: AddDeviceLink', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render link for add device page.', () => {
    setupAndRenderComponent({
      state: {},
      component: AddDeviceLink,
    });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/new');
  });
});
