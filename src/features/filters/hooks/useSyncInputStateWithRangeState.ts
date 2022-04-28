import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import validateValuesByMinMaxBounds from '../helpers/validateValuesByMinMaxBounds';

interface IProps {
  values: number[];
  setRange: Dispatch<SetStateAction<number[]>>;
}

const useSyncInputStateWithRangeState = ({ values, setRange }: IProps) => {
  const options = useTypedSelector((state) => state.filters.options);

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
