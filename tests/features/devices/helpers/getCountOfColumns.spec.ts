/* eslint-disable max-len */
import getCountOfColumns from '@src/features/devices/helpers/getCountOfColumns';

const DEVICE_WIDTH = {
  mobileSmall: 320,
  mobileMedium: 375,
  mobileLarge: 425,
  tablet: 768,
  laptop: 1024,
  laptopLarge: 1440,
  desktop: 2560,
};

describe('HELPERS ---> getCountOfColumns', () => {
  test('should return 4 columns when screens equal to or greater than 1200px wide ', () => {
    expect(getCountOfColumns(DEVICE_WIDTH.laptopLarge)).toBe(4);
    expect(getCountOfColumns(DEVICE_WIDTH.desktop)).toBe(4);
  });

  test('should return 3 columns when screens equal to or greater than 992px wide', () => {
    expect(getCountOfColumns(DEVICE_WIDTH.laptop)).toBe(3);
    expect(getCountOfColumns(1199)).toBe(3);
  });

  test('should return 2 columns when screens less than 992px wide', () => {
    expect(getCountOfColumns(991)).toBe(2);
  });

  test('should return 1 columns when screen less than 768px wide', () => {
    expect(getCountOfColumns(DEVICE_WIDTH.tablet)).toBe(1);
    expect(getCountOfColumns(DEVICE_WIDTH.mobileLarge)).toBe(1);
    expect(getCountOfColumns(DEVICE_WIDTH.mobileMedium)).toBe(1);
    expect(getCountOfColumns(DEVICE_WIDTH.mobileSmall)).toBe(1);
  });
});
