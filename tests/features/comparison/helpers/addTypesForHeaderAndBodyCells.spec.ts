import addTypesForHeaderAndBodyCells from '@features/comparison/helpers/addTypesForHeaderAndBodyCells';
import getPossibleOptionsListFromDevices from '@features/comparison/helpers/getPossibleOptionsListFromDevices';
import fillOptionsListByDevices from '@features/comparison/helpers/fillOptionsListByDevices';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[HELPERS]: addTypesForHeaderAndBodyCells', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add types for table cells.', () => {
    const emptyOptionsList = getPossibleOptionsListFromDevices(rootStateMock.comparison.items);
    const filledInOptionsList = fillOptionsListByDevices({
      list: emptyOptionsList,
      devices: rootStateMock.comparison.items,
    });

    const table = addTypesForHeaderAndBodyCells({ header: rootStateMock.comparison.items, body: filledInOptionsList });

    expect(table).toEqual(rootStateMock.comparison.table);
  });
});
