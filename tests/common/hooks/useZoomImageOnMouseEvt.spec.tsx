import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useZoomImageOnMouseEvt from '@src/common/hooks/useZoomImageOnMouseEvt';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight',
) as PropertyDescriptor;

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth',
) as PropertyDescriptor;

describe('[HOOK]:  useZoomImageOnMouseEvt', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    });

    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      left: 10,
      width: 400,
      x: 10,
      y: 250,
      height: 40,
      top: 250,
      right: 251,
      bottom: 290,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight,
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth,
    );
  });
  test('should have init methods and values.', () => {
    const { result } = renderHook(() => useZoomImageOnMouseEvt());

    expect(typeof result.current.onMouseEnter).toBe('function');
    expect(typeof result.current.onMouseLeave).toBe('function');
    expect(typeof result.current.onMouseMove).toBe('function');
    expect(typeof result.current.setIsLensActive).toBe('function');

    expect(result.current.isLensActive).toBeFalsy();
    expect(result.current.imgRef).toEqual({ current: null });
    expect(result.current.lensRef).toEqual({ current: null });
    expect(result.current.lensOutputRef).toEqual({ current: null });
  });

  test('isLensActive should be equal to true onMouseEnter event.', async () => {
    const { result } = renderHook(() => {
      return useZoomImageOnMouseEvt();
    });

    act(() => {
      result.current.onMouseEnter();
    });

    await waitFor(() => {
      expect(result.current.isLensActive).toBeTruthy();
    });
  });

  test('isLensActive should be equal to false onMouseLeave event.', async () => {
    const { result } = renderHook(() => {
      return useZoomImageOnMouseEvt();
    });

    act(() => {
      result.current.onMouseEnter();
    });

    await waitFor(() => {
      expect(result.current.isLensActive).toBeTruthy();
    });

    act(() => {
      result.current.onMouseLeave();
    });

    await waitFor(() => {
      expect(result.current.isLensActive).toBeFalsy();
    });
  });

  test('should render lens output.', async () => {
    const { result } = renderHook(() => {
      return useZoomImageOnMouseEvt();
    });

    const imgHeight = 200;
    const imgWidth = 400;
    const altTxt = 'Hp pavillion';
    const imgSrc = 'https://img.jpeg';

    const { getByText } = render(
      <>
        <img
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          ref={result.current.imgRef}
          alt={altTxt}
        />
        <div>
          <div ref={result.current.lensRef}>lens</div>
          <div ref={result.current.lensOutputRef}>lens output</div>
        </div>
      </>,
    );

    act(() => {
      result.current.onMouseMove({
        pageX: 0,
        pageY: 0,
        preventDefault: jest.fn(),
      } as any);
    });

    expect(result.current.isLensActive).toBeTruthy();

    expect(getByText(/lens output/i).style.backgroundImage).toBe(
      `url(${imgSrc}/)`,
    );
    expect(getByText(/lens output/i).style.backgroundSize).toBe(
      `${imgWidth}px ${imgHeight}px`,
    );
  });

  test('should not change styles in case refs are equal to null.', async () => {
    const { result } = renderHook(() => {
      return useZoomImageOnMouseEvt();
    });

    const imgHeight = 200;
    const imgWidth = 400;
    const altTxt = 'Hp pavillion';

    const { getByText } = render(
      <>
        <img
          width={imgWidth}
          height={imgHeight}
          ref={result.current.imgRef}
          alt={altTxt}
        />
        <div>
          <div>lens</div>
          <div>lens output</div>
        </div>
      </>,
    );

    act(() => {
      result.current.onMouseMove({
        pageX: 0,
        pageY: 0,
        preventDefault: jest.fn(),
      } as any);
    });

    expect(getByText(/lens output/i).style.backgroundImage).toBe('');
    expect(getByText(/lens output/i).style.backgroundSize).toBe('');
  });
});
