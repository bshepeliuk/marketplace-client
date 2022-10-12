interface ISearchOrderValidation {
  [key: string]: (value: number | string) => boolean;
}

const searchOrderValidation: ISearchOrderValidation = {
  id(value: string | number) {
    return !Number.isNaN(Number(value)) && typeof Number(value) === 'number';
  },
};

const searchOrderErrors = {
  id: {
    message: 'Order id should be a number.',
  },
};

export { searchOrderValidation, searchOrderErrors };
