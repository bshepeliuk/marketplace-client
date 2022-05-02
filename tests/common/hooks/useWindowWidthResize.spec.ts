import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useWindowWidthResize from '@src/common/hooks/useWindowWidthResize';
import resizeWindow from '../../helpers/resizeWindow';

describe('useWindowWidthResize', () => {
  test('resize window', () => {
    const { result } = renderHook(() => useWindowWidthResize());

    expect(result.current.size.width).toBe(global.innerWidth);

    act(() => {
      resizeWindow(1440, 768);
    });

    expect(result.current.size.width).toBe(global.innerWidth);

    act(() => {
      resizeWindow(2560, 768);
    });

    expect(result.current.size.width).toBe(global.innerWidth);
  });
});
