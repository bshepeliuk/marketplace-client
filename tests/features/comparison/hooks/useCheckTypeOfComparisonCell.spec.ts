import { renderHook } from '@testing-library/react-hooks';
import useCheckTypeOfComparisonCell from '@features/comparison/hooks/useCheckTypeOfComparisonCell';
import { TableCellTypes } from '@features/comparison/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

describe('[HOOK]: useCheckTypeOfComparisonCell', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should have methods for checking type of cells.', () => {
    const { result } = renderHook(() => useCheckTypeOfComparisonCell(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.isBodyFeatureKeyCell).toBe('function');
    expect(typeof result.current.isHeaderInfoCell).toBe('function');
  });

  test('should return true in case it is body feature key cell.', () => {
    const bodyFeatureKeyCell = { type: TableCellTypes.FeatureKey, value: 'some feature key' };

    const { result } = renderHook(() => useCheckTypeOfComparisonCell(), {
      wrapper: Wrapper,
    });

    expect(result.current.isBodyFeatureKeyCell(bodyFeatureKeyCell)).toBeTruthy();
    expect(result.current.isBodyFeatureKeyCell({ type: TableCellTypes.FeatureValue, value: '' })).toBeFalsy();
  });

  test('should return true in case it is header info cell.', () => {
    const bodyFeatureKeyCell = { type: TableCellTypes.HeaderInfo, value: 'some feature key' };

    const { result } = renderHook(() => useCheckTypeOfComparisonCell(), {
      wrapper: Wrapper,
    });

    expect(result.current.isHeaderInfoCell(bodyFeatureKeyCell)).toBeTruthy();
    expect(result.current.isHeaderInfoCell({ type: TableCellTypes.Header, ...deviceMock })).toBeFalsy();
  });
});
