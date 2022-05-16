// XS (for phones - screens less than 768px wide)
// SM (for tablets - screens equal to or greater than 768px wide)
// MD (for small laptops - screens equal to or greater than 992px wide)
// LG (for laptops and desktops - screens equal to or greater than 1200px wide)

export const CONTAINER_WIDTH = {
  LG: 1200,
  MD: 900,
  SM: 605,
  XS: 320,
};

export const COLUMN_DEFAULT = 4;
export const COLUMN_LG = 3;
export const COLUMN_MD = 2;
export const COLUMN_SM = 1;

const getCountOfColumns = (width: number | undefined) => {
  let columns = COLUMN_DEFAULT;

  if (width === undefined) return COLUMN_DEFAULT;

  if (width === CONTAINER_WIDTH.LG) columns = COLUMN_DEFAULT;
  if (width === CONTAINER_WIDTH.MD) columns = COLUMN_LG;
  if (width === CONTAINER_WIDTH.SM) columns = COLUMN_MD;
  if (width === CONTAINER_WIDTH.XS) columns = COLUMN_SM;

  return columns;
};

export default getCountOfColumns;
