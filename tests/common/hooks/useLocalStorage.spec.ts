import { renderHook } from '@testing-library/react-hooks';
import useLocalStorage from '@src/common/hooks/useLocalStorage';

const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
const removeItemMock = jest.spyOn(Storage.prototype, 'removeItem');

describe('[HOOK] useLocalStorage', () => {
  test('should have methods for interacting with localStorage.', () => {
    const { result } = renderHook(() => useLocalStorage());

    expect(typeof result.current.getItem).toBe('function');
    expect(typeof result.current.setItem).toBe('function');
    expect(typeof result.current.removeItem).toBe('function');
  });

  test('should get data by key from localStorage.', () => {
    const { result } = renderHook(() => useLocalStorage());

    result.current.getItem('SOME_KEY');

    expect(getItemMock).toBeCalledWith('SOME_KEY');
  });

  test('should add data to localStorage by key.', () => {
    const { result } = renderHook(() => useLocalStorage());

    const key = 'SOME_KEY';
    const data = [{ hello: 'world' }];

    result.current.setItem(key, data);

    expect(setItemMock).toBeCalledWith('SOME_KEY', JSON.stringify(data));
  });

  test('should remove data from localStorage by key.', () => {
    const { result } = renderHook(() => useLocalStorage());

    const key = 'SOME_KEY';

    result.current.removeItem(key);

    expect(removeItemMock).toBeCalledWith(key);
  });
});
