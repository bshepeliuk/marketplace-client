const setupUseFormikMock = ({ mock = null, options = {} }: any) => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleBlur = jest.fn();

  mock.mockReturnValue({
    handleChange,
    handleSubmit,
    handleBlur,
    values: options.values ?? {},
    touched: options.touched ?? {},
    errors: options.errors ?? {},
  } as any);

  return {
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default setupUseFormikMock;
