import { fireEvent } from '@testing-library/react';

import DeviceImageSlider from '@features/devices/components/DeviceSlider/DeviceImageSlider';
import useSlider, { SlideDirection } from '@src/common/hooks/useSlider';

import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

jest.mock('@src/common/hooks/useSlider');

describe('[COMPONENTS]: DeviceImageSlider', () => {
  const setActiveIdxMock = jest.fn();

  beforeEach(() => {
    (useSlider as jest.Mock).mockReturnValue({
      slideDirection: SlideDirection.None,
      activeIdx: 0,
      setActiveIdx: setActiveIdxMock,
      onLeftClick: jest.fn(),
      onRightClick: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render images list and image selected by default.', () => {
    const urlsMock = [
      'https://img1.jpeg',
      'https://img2.jpeg',
      'https://img3.jpeg',
      'https://img4.jpeg',
      'https://img5.jpeg',
    ];

    const { getAllByAltText } = setupAndRenderComponent({
      state: rootStateMock,
      component: DeviceImageSlider,
      props: {
        alt: 'ASUS 17',
        urls: urlsMock,
      },
    });

    expect(getAllByAltText(/asus 17/i)).toHaveLength(urlsMock.length + 1);
  });

  test('should not render images list in case only one image was added.', () => {
    const urlsMock = ['https://img1.jpeg'];

    const { getAllByAltText } = setupAndRenderComponent({
      state: rootStateMock,
      component: DeviceImageSlider,
      props: {
        alt: 'ASUS 17',
        urls: urlsMock,
      },
    });

    expect(getAllByAltText(/asus 17/i)).toHaveLength(urlsMock.length);
  });

  test('should call setActiveIdx method with the corresponding index on image click.', () => {
    const urlsMock = ['https://img1.jpeg', 'https://img2.jpeg'];

    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: DeviceImageSlider,
      props: {
        alt: 'ASUS 17',
        urls: urlsMock,
      },
    });

    const DeviceImg = container.querySelector(`img[src="${urlsMock[1]}"]`) as Element;

    expect(DeviceImg).toBeInTheDocument();

    fireEvent.click(DeviceImg);
    // 1 = idx
    expect(setActiveIdxMock).toBeCalledWith(1);
  });
});
