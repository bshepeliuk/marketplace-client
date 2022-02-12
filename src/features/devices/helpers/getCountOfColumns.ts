// XS (for phones - screens less than 768px wide)
// SM (for tablets - screens equal to or greater than 768px wide)
// MD (for small laptops - screens equal to or greater than 992px wide)
// LG (for laptops and desktops - screens equal to or greater than 1200px wide)

export const LG = 1200;
export const MD = 992;
export const SM = 768;

export const COLUMN_DEFAULT = 4;
export const COLUMN_LG = 3;
export const COLUMN_MD = 2;
export const COLUMN_SM = 1;

const getCountOfColumns = (width: number) => {
  let columns = COLUMN_DEFAULT;

  if (width <= LG) columns = COLUMN_LG;
  if (width <= MD) columns = COLUMN_MD;
  if (width <= SM) columns = COLUMN_SM;

  return columns;
};

export default getCountOfColumns;
