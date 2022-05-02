import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import validateValuesByMinMaxBounds from '../helpers/validateValuesByMinMaxBounds';
import useFilterContext from './useFilterContext';

interface IProps {
  values: number[];
  setRange: Dispatch<SetStateAction<number[]>>;
  setValues: Dispatch<SetStateAction<number[]>>;
}

const useSyncInputStateWithRangeState = ({
  values,
  setRange,
  setValues,
}: IProps) => {
  const context = useFilterContext();
  const options = useTypedSelector((state) => state.filters.options);

  const { prices, shouldBeInitial, setShouldBeInitial } = context;

  const haveMinMaxValues = Object.keys(options.prices).length > 0;

  useEffect(() => {
    if (shouldBeInitial) {
      setRange([options.prices.min, options.prices.max]);
      setValues([options.prices.min, options.prices.max]);

      setShouldBeInitial(false);
    }
  }, [shouldBeInitial]);

  useEffect(() => {
    if (prices.length === 0 && haveMinMaxValues) {
      setRange([options.prices.min, options.prices.max]);
      setValues([options.prices.min, options.prices.max]);
    }
  }, [options.prices]);

  useEffect(() => {
    const { min, max } = options.prices;

    validateValuesByMinMaxBounds({
      values: { min: values[0], max: values[1] },
      bounds: { min, max },
    })
      .then((res) => {
        if (res.min && res.max) setRange([res.min, res.max]);
      })
      .catch(() => {
        // TODO: notification; state for handle errors on min/max inputs;
      });
  }, [values]);
};

export default useSyncInputStateWithRangeState;
