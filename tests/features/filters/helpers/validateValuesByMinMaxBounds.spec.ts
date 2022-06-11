/* eslint-disable max-len */
import validateValuesByMinMaxBounds from '@src/features/filters/helpers/validateValuesByMinMaxBounds';
import { ValidationError } from 'yup';

describe('[HELPERS] validateValuesByMinMaxBounds', () => {
  it('should throw error when value less than min. bound', async () => {
    try {
      await validateValuesByMinMaxBounds({
        bounds: { min: 4, max: 10 },
        values: { min: 3, max: 9 },
      });
    } catch (error) {
      const yupError = error as ValidationError;
      expect(yupError.errors[0]).toEqual('Min value can not be less than 4.');
    }
  });

  it('should throw error when value greater than max. bound', async () => {
    try {
      await validateValuesByMinMaxBounds({
        bounds: { min: 4, max: 10 },
        values: { min: 5, max: 19 },
      });
    } catch (error) {
      const yupError = error as ValidationError;

      expect(yupError.errors[0]).toEqual(
        'Max value can not be greater than 10.',
      );
    }
  });

  it('should return values when min and max bounds are acceptable.', async () => {
    const res = await validateValuesByMinMaxBounds({
      bounds: { min: 4, max: 10 },
      values: { min: 6, max: 8 },
    });

    expect(res).toEqual({ min: 6, max: 8 });
  });
});
