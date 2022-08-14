interface ISize {
  width: number;
}

const calculateCommentListWidthBySize = (size: ISize) => {
  const CONTAINER_WIDTH = {
    LG: 500,
    SM: 400,
    XS: 320,
  };

  const CURRENT_WIDTH = {
    LG: 530,
    SM: 450,
  };

  if (size.width < CURRENT_WIDTH.SM) {
    return CONTAINER_WIDTH.XS;
  }

  if (size.width < CURRENT_WIDTH.LG) {
    return CONTAINER_WIDTH.SM;
  }

  return CONTAINER_WIDTH.LG;
};

export default calculateCommentListWidthBySize;
