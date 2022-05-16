function groupBy<T, K extends keyof T>(data: T[], key: K) {
  const result = data.reduce((prev, current) => {
    if (prev.has(current[key])) {
      prev.get(current[key])!.push(current);
    } else {
      prev.set(current[key], [current]);
    }

    return prev;
  }, new Map<T[K], T[]>());

  return Array.from(result);
}

export default groupBy;
