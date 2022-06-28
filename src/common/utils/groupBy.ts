function groupBy<T, K extends keyof T>(data: T[], key: K) {
  const result = data.reduce((prev, current) => {
    const title = (current[key] as unknown as string).toLowerCase();

    if (prev.has(title)) {
      prev.get(title)!.push(current);
    } else {
      prev.set(title, [current]);
    }

    return prev;
  }, new Map<T[K] | string, T[]>());

  return Array.from(result);
}

export default groupBy;
