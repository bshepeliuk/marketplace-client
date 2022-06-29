const sleep = (t: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
};

export default sleep;
