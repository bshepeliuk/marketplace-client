import { IDevice } from '@src/features/devices/types';
import { TableCellTypes } from '../constants';

interface IProps {
  header: IDevice[];
  body: Array<[string, string[]]>;
}

const addTypesForHeaderAndBodyCells = ({ header, body }: IProps) => {
  const devices = header.map((device) => ({
    type: TableCellTypes.Header,
    ...device,
  }));

  const headerRow = [
    {
      type: TableCellTypes.HeaderInfo,
      value: `${header.length} devices have been added for comparison.`,
    },
    ...devices,
  ];

  const bodyTable = body.map(([key, values]) => [
    { type: TableCellTypes.FeatureKey, value: key },
    ...values.map((value) => ({ type: TableCellTypes.FeatureValue, value })),
  ]);

  return {
    header: headerRow,
    body: bodyTable,
  };
};

export default addTypesForHeaderAndBodyCells;
