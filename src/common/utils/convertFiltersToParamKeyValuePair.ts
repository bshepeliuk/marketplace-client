type Filters = Record<string, string | number | string[] | number[]>;
type KeyValuePair = [string, string];

const convertFiltersToParamKeyValuePair = <T extends Filters>(filters: T) => {
  return Object.entries(filters).reduce((prev, current) => {
    const [key, value] = current;

    return Array.isArray(value)
      ? [...prev, ...(value.map((item) => [key, convertNumberToString(item)]) as Array<KeyValuePair>)]
      : [...prev, [key, convertNumberToString(value)] as KeyValuePair];
  }, [] as Array<KeyValuePair>);
};

const convertNumberToString = (value?: number | string) => (typeof value === 'number' ? String(value) : value);

export default convertFiltersToParamKeyValuePair;
