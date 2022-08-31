import { TableCellTypes } from '../constants';
import { BodyCellType, HeaderCellType, IBodyFeatureKey, IHeaderInfo } from '../types';

const useCheckTypeOfComparisonCell = () => {
  const isHeaderInfoCell = (cell: HeaderCellType): cell is IHeaderInfo => {
    return cell.type === TableCellTypes.HeaderInfo;
  };

  const isBodyFeatureKeyCell = (cell: BodyCellType): cell is IBodyFeatureKey => {
    return cell.type === TableCellTypes.FeatureKey;
  };

  return {
    isHeaderInfoCell,
    isBodyFeatureKeyCell,
  };
};

export default useCheckTypeOfComparisonCell;
