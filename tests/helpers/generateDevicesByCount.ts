function generateDevicesByCount(count: number) {
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= count; i++) {
    result.push({
      id: i,
      name: `Test Device - ${i}`,
      brandId: 1,
      typeId: 1,
      price: 1000,
      images: [1],
      info: [1],
    });
  }

  return result;
}

export default generateDevicesByCount;
