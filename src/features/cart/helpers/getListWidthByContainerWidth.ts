const getListWidthByContainerWidth = (containerWidth: number) => {
  const DEFAULT_LIST_WIDTH = 650;
  const MEDIUM_LIST_WIDTH = 520;
  const SMALL_LIST_WIDTH = 400;
  const EXTRA_SMALL_LIST_WIDTH = 360;

  if (containerWidth <= 420) return EXTRA_SMALL_LIST_WIDTH;
  if (containerWidth <= 600) return SMALL_LIST_WIDTH;
  if (containerWidth <= 700) return MEDIUM_LIST_WIDTH;

  return DEFAULT_LIST_WIDTH;
};

export default getListWidthByContainerWidth;
