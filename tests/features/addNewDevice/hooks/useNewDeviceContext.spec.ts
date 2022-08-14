import { renderHook } from '@testing-library/react-hooks';
import useNewDeviceContext from '@src/features/addNewDevice/hooks/useNewDeviceContext';

describe('[HOOKS]: useNewDeviceContext', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('should return error when hooks was not wrapped in NewDeviceProvider', () => {
    const { result } = renderHook(() => useNewDeviceContext());

    expect(result.error?.message).toBe(
      'useNewDeviceContext must be used within a NewDeviceProvider.',
    );
  });
});
