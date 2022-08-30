interface IProps<T> {
  array: T[];
  fromIndex: number;
  toIndex: number;
}

function arrayMoveImmutable<T>({ array, fromIndex, toIndex }: IProps<T>) {
  const newArray = [...array];

  arrayMoveMutable({ array: newArray, fromIndex, toIndex });

  return newArray;
}

function arrayMoveMutable<T>({ array, fromIndex, toIndex }: IProps<T>) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export default arrayMoveImmutable;
