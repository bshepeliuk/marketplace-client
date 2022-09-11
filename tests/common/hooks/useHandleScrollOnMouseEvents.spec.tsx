/* eslint-disable max-len */
import { renderHook, act } from '@testing-library/react-hooks';
import useHandleScrollOnMouseEvents from '@src/common/hooks/useHandleScrollOnMouseEvents';
import { RefObject, useRef } from 'react';
import { fireEvent } from '@testing-library/dom';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('[HOOK]: useHandleScrollOnMouseEvents', () => {
  test('isScrolling should be true on mousedown and mousemove. isScrolling should be false on mouseup.', async () => {
    const div = document.createElement('div');

    (useRef as jest.Mock).mockReturnValueOnce({
      current: { x: 0, y: 0 },
    } as RefObject<{ x: number; y: number }>);

    const { result } = renderHook(() => {
      return useHandleScrollOnMouseEvents({ ref: { current: div }, deps: [] });
    });

    div.scrollLeft = 10;

    act(() => {
      fireEvent.mouseDown(div, { clientX: 120 });
    });

    expect(result.current.isScrolling).toBeTruthy();

    act(() => {
      fireEvent.mouseMove(div, { clientX: 240 });
    });

    expect(result.current.isScrolling).toBeTruthy();

    act(() => {
      fireEvent.mouseUp(document);
    });

    expect(result.current.isScrolling).toBeFalsy();
  });
});
