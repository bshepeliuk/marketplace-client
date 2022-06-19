/* eslint-disable max-len */
import entitiesReducer, {
  initialState,
} from '@src/features/entities/entitiesReducer';
import { entitiesValuesMock } from '../../mocks/data';

describe('[REDUCER]: entities', () => {
  test('should return initial state when action payload does not have entities field.', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
      payload: undefined,
    };

    expect(entitiesReducer(initialState, action)).toEqual(initialState);
  });

  test('should update entities from payload', () => {
    const action = {
      type: 'SOME_ACTION',
      payload: { entities: entitiesValuesMock },
    };

    expect(entitiesReducer(initialState, action)).toEqual({
      ...initialState,
      ...entitiesValuesMock,
    });
  });
});
