import { fireEvent } from '@testing-library/react';
import StarRating from '@src/common/components/StarRating/StarRatingView';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

jest.mock('@features/devices/hooks/useEvaluateDevice');

describe('[COMPONENTS]: StarRatingView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('all stars should be filled when mouse over last star.', async () => {
    const numberOfStars = 5;

    const clientX = 240;
    const left = 51;
    const width = 200;

    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      left,
      width,
      x: left,
      y: 250,
      height: 40,
      top: 250,
      right: 251,
      bottom: 290,
    });

    const onChangeStarMock = jest.fn();

    const { container } = setupAndRenderComponent({
      state: {},
      component: StarRating,
      props: {
        initRating: 0,
        precision: 1,
        totalStars: 5,
        size: 20,
        isInteractive: true,
        onChange: onChangeStarMock,
      },
    });

    const Star = container.querySelector('[data-star-id="5"]') as HTMLDivElement;

    fireEvent.mouseOver(Star, { clientX });

    const filledStars = container.querySelectorAll('[data-star-state="filled"]');

    expect(filledStars).toHaveLength(numberOfStars);
  });

  test('all stars should be filled when mouse reached to last star.', async () => {
    const numberOfStars = 5;

    const clientX = 240;
    const left = 51;
    const width = 200;

    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      left,
      width,
      x: left,
      y: 250,
      height: 40,
      top: 250,
      right: 251,
      bottom: 290,
    });

    const onChangeStarMock = jest.fn();

    const { container } = setupAndRenderComponent({
      state: {},
      component: StarRating,
      props: {
        initRating: 0,
        precision: 1,
        totalStars: 5,
        size: 20,
        isInteractive: true,
        onChange: onChangeStarMock,
      },
    });

    const Star = container.querySelector('[data-star-id="5"]') as HTMLDivElement;

    fireEvent.mouseMove(Star, { clientX });

    const filledStars = container.querySelectorAll('[data-star-state="filled"]');

    expect(filledStars).toHaveLength(numberOfStars);
  });

  test('should return to init. value when user did not select star.', async () => {
    const clientX = 240;
    const left = 51;
    const width = 200;

    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      left,
      width,
      x: left,
      y: 250,
      height: 40,
      top: 250,
      right: 251,
      bottom: 290,
    });

    const onChangeStarMock = jest.fn();

    const { container } = setupAndRenderComponent({
      state: {},
      component: StarRating,
      props: {
        initRating: 0,
        precision: 1,
        totalStars: 5,
        size: 20,
        isInteractive: true,
        onChange: onChangeStarMock,
      },
    });

    const Star = container.querySelector('[data-star-id="5"]') as HTMLDivElement;

    fireEvent.mouseLeave(Star, { clientX });

    const filledStars = container.querySelectorAll('[data-star-state="filled"]');

    expect(filledStars).toHaveLength(0);
  });

  test('should call onChange callback when user clicked on star', async () => {
    const numberOfStars = 5;

    const clientX = 230;
    const left = 51;
    const width = 200;

    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      left,
      width,
      x: left,
      y: 250,
      height: 40,
      top: 250,
      right: 251,
      bottom: 290,
    });

    const onChangeStarMock = jest.fn();

    const { container } = setupAndRenderComponent({
      state: {},
      component: StarRating,
      props: {
        initRating: 0,
        precision: 1,
        totalStars: 5,
        size: 20,
        isInteractive: true,
        onChange: onChangeStarMock,
      },
    });

    const Star = container.querySelector('[data-star-id="5"]') as HTMLDivElement;

    fireEvent.click(Star, { clientX });

    const filledStars = container.querySelectorAll('[data-star-state="filled"]');

    expect(filledStars).toHaveLength(numberOfStars);
    expect(onChangeStarMock).toBeCalledTimes(1);
  });
});
