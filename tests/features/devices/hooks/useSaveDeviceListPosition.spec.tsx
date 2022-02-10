import { renderHook } from '@testing-library/react-hooks';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line max-len
import useSaveDeviceListPosition from '@features/devices/hooks/useSaveDeviceListPosition';
import { Wrapper } from '../../../wrapper';

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockImplementation(() => {
      return { state: { rowIndex: 10 } };
    }),
  };
});

describe('useSaveDeviceListPosition hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('state should have saved rowIndex', async () => {
    const { result } = renderHook(() => useSaveDeviceListPosition(), {
      wrapper: Wrapper,
    });

    expect(useLocation()).toEqual({ state: { rowIndex: 10 } });
    expect(result.current.rowIndexState).toBe(10);
  });

  test('state should have new saved rowIndex', async () => {
    const useLocationMock = (useLocation as jest.Mock).mockReturnValue({
      state: { rowIndex: 20 },
    });

    const { result } = renderHook(() => useSaveDeviceListPosition(), {
      wrapper: Wrapper,
    });

    expect(useLocationMock()).toEqual({ state: { rowIndex: 20 } });
    expect(result.current.rowIndexState).toBe(20);
  });
});
