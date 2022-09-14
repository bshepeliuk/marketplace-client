import getPossibleOptionsListFromDevices from '@features/comparison/helpers/getPossibleOptionsListFromDevices';
import { rootStateMock } from '../../../mocks/stateMock';
import { emptyTableOptionsListMock } from '../../../mocks/data';

describe('[HELPERS]: getPossibleOptionsListFromDevices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return empty options list based on added devices.', () => {
    const emptyOptionsList = getPossibleOptionsListFromDevices(rootStateMock.comparison.items);

    expect(emptyOptionsList).toEqual(emptyTableOptionsListMock);
  });
});
