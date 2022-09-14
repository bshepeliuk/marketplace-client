import comparisonReducer, { comparisonActions, initialState } from '@src/features/comparison/comparisonSlice';
import { comparisonItemsMock, comparisonTableMock, deviceMock } from '../../mocks/data';

describe('[REDUCER]: comparison.', () => {
  test('should return initial state', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(comparisonReducer(initialState, action)).toEqual(initialState);
  });

  test('should delete item from state by id.', () => {
    const action = {
      type: comparisonActions.deleteById.type,
      payload: { deviceId: deviceMock.id },
    };

    expect(comparisonReducer({ ...initialState, items: [deviceMock] }, action)).toEqual(initialState);
  });

  test('should add item to comparison.', () => {
    const action = {
      type: comparisonActions.add.type,
      payload: { device: deviceMock },
    };

    expect(comparisonReducer(initialState, action)).toEqual({ ...initialState, items: [deviceMock] });
  });

  test('should populate comparison items.', () => {
    const action = {
      type: comparisonActions.populate.type,
      payload: { items: [deviceMock] },
    };

    expect(comparisonReducer(initialState, action)).toEqual({ ...initialState, items: [deviceMock] });
  });

  test('should set comparison table.', () => {
    const action = {
      type: comparisonActions.setComparisonTable.type,
      payload: { header: comparisonTableMock.header, body: comparisonTableMock.body },
    };

    expect(comparisonReducer(initialState, action)).toEqual({ ...initialState, table: comparisonTableMock });
  });

  test('should return comparison table.', () => {
    const action = {
      type: comparisonActions.getComparisonTable.type,
    };

    expect(comparisonReducer({ ...initialState, items: comparisonItemsMock }, action)).toEqual({
      ...initialState,
      items: comparisonItemsMock,
      table: comparisonTableMock,
    });
  });
});
