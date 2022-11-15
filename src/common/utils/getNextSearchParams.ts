type Props = {
  prev: Array<[string, string | undefined]>;
  next: Array<[string, string | undefined]>;
};
type KeyValuePair = [string, string];

const getNextSearchParams = ({ prev, next }: Props) => {
  const nextKeys = next.map(([key]) => key);

  const prevParams = prev.filter((item) => {
    return !nextKeys.includes(item[0]);
  });

  return next.filter(([_, value]) => value !== undefined && value !== '').concat(prevParams) as Array<KeyValuePair>;
};

export default getNextSearchParams;
