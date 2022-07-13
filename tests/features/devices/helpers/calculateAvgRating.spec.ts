import calculateAvgRating from '@features/devices/helpers/calculateAvgRating';
import { IDeviceRating } from '@src/features/devices/types';

const ratings: IDeviceRating[] = [
  {
    id: 1,
    rate: 1,
    deviceId: 1,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    rate: 2,
    deviceId: 1,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    rate: 3.5,
    deviceId: 1,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe('[HELPERS]: calculateAvgRating', () => {
  test('should return AVG rating.', () => {
    const ratingSum = ratings.reduce((acc, curr) => acc + curr.rate, 0);
    const avgRating = Number((ratingSum / ratings.length).toFixed(2));

    expect(calculateAvgRating(ratings)).toBe(avgRating);
  });

  test('should return 0 when ratings array is equal to empty array or undefined.', () => {
    expect(calculateAvgRating([])).toBe(0);
    expect(calculateAvgRating(undefined)).toBe(0);
  });
});
