interface Params<T, K> {
  data: T[];
  order?: 'ASC' | 'DESC';
  sortField: K;
}

const sortDate = <K extends keyof T, T extends Record<K, string | Date>>({
  data,
  order = 'ASC',
  sortField,
}: Params<T, K>): T[] => {
  return [...data].sort((prev, next) => {
    const prevIsGreater = new Date(prev[sortField]) > new Date(next[sortField]);
    const isASC = order.toUpperCase() === 'ASC';

    if (isASC) {
      return prevIsGreater ? 1 : -1;
    }

    return prevIsGreater ? -1 : 1;
  });
};

export default sortDate;
