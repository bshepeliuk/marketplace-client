const createSearchParamsStr = <T>(props: T): string => {
  const params = fromObjectToArray(props);

  return new URLSearchParams(params).toString();
};

function fromObjectToArray<T, K extends keyof T>(props: Record<K, T[K]>) {
  return Object.entries(props)
    .filter(([, v]) => v !== undefined)
    .reduce((acc, current) => {
      const [key, value] = current;

      if (Array.isArray(value)) {
        const res = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const item of value) {
          res.push([key, item]);
        }

        return [...acc, ...res];
      }

      return [...acc, [key, value]];
    }, [] as Array<string[]>);
}

export default createSearchParamsStr;
