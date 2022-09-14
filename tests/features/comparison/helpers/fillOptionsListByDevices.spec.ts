import getPossibleOptionsListFromDevices from '@features/comparison/helpers/getPossibleOptionsListFromDevices';
import fillOptionsListByDevices from '@features/comparison/helpers/fillOptionsListByDevices';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock, filledInTableOptionsListMock } from '../../../mocks/data';

describe('[HELPERS]: fillOptionsListByDevices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fill in all possible options.', () => {
    const emptyOptionsList = getPossibleOptionsListFromDevices(rootStateMock.comparison.items);
    const filledInOptionsList = fillOptionsListByDevices({
      list: emptyOptionsList,
      devices: rootStateMock.comparison.items,
    });

    expect(filledInOptionsList).toEqual(filledInTableOptionsListMock);
  });

  test('in case device does not have such info, should fill in all empty fields with a dash', () => {
    const emptyOptionsList = getPossibleOptionsListFromDevices(rootStateMock.comparison.items);
    const filledInOptionsList = fillOptionsListByDevices({
      list: emptyOptionsList,
      devices: [{ ...deviceMock, info: [] }],
    });

    const optionsList = filledInTableOptionsListMock.map(([key]) => [key, ['-']]);

    expect(filledInOptionsList).toEqual(optionsList);
  });
});
