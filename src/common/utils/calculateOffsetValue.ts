interface IProps {
  amount: number;
  limit: number;
}

const calculateOffsetValue = ({ amount, limit }: IProps) => {
  const offsetValue = amount % limit === 0 ? amount : amount - (amount % limit);
  return offsetValue >= limit ? offsetValue : 0;
};

export default calculateOffsetValue;
