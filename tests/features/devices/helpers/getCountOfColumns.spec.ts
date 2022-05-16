/* eslint-disable max-len */
import getCountOfColumns, {
  CONTAINER_WIDTH,
} from '@src/features/devices/helpers/getCountOfColumns';

describe('HELPERS ---> getCountOfColumns', () => {
  test('should return 4 columns when container equal 1200px wide', () => {
    expect(getCountOfColumns(CONTAINER_WIDTH.LG)).toBe(4);
  });

  test('should return 3 columns when screens equal 900px wide', () => {
    expect(getCountOfColumns(CONTAINER_WIDTH.MD)).toBe(3);
  });

  test('should return 2 columns when screens equal 605px wide', () => {
    expect(getCountOfColumns(CONTAINER_WIDTH.SM)).toBe(2);
  });

  test('should return 1 column when screen equal 320px wide', () => {
    expect(getCountOfColumns(CONTAINER_WIDTH.XS)).toBe(1);
  });
});
