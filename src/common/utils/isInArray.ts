type IdType = string | number;

const isInArray = <T extends { id: IdType }>(itemId: IdType, data: T[]) => {
  return data.some((i) => Number(i.id) === Number(itemId));
};

export default isInArray;
