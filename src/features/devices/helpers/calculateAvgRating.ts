import { IDeviceRating } from '../types';

const calculateAvgRating = (ratings: IDeviceRating[]) => {
  if (ratings.length === 0) return 0;

  const rating = ratings.reduce((acc, current) => acc + current.rate, 0);

  const avgRating = rating / ratings.length;

  return Number(avgRating.toFixed(2));
};

export default calculateAvgRating;
