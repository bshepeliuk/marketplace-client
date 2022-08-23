const useLocalStorage = () => {
  const getItem = <T>(key: string) => {
    const items = localStorage.getItem(key);
    const data = deserialize<T>(items);

    return data;
  };

  const setItem = <T>(key: string, data: T) => {
    localStorage.setItem(key, serialize(data));
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const serialize = <T>(data: T): string => {
    return JSON.stringify(data);
  };
  const deserialize = <T>(data: string | null): T[] => {
    if (!data) return [];

    return JSON.parse(data);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useLocalStorage;
