interface IProps {
  itemsCount: number;
  columns: number;
}

const calcAndGetCountOfRows = ({ itemsCount, columns }: IProps) => {
  return Math.ceil(itemsCount / columns);
};

export default calcAndGetCountOfRows;
