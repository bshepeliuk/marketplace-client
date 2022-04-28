const joinMinMaxPricesInEntries = (filters: Array<string[]>) => {
  return filters.reduce((acc, current) => {
    const [key, value] = current;
    if (key === 'minPrice') {
      return [[value], ...acc.splice(0)];
    }

    if (key === 'maxPrice') {
      const priceRange = [...acc.splice(0, 1)[0], value].join(' - ');
      return [['prices', priceRange], ...acc.splice(0)];
    }

    return [...acc, [key, value]];
  }, [] as Array<string[]>);
};

export default joinMinMaxPricesInEntries;
