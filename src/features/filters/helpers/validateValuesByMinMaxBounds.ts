import * as Yup from 'yup';

interface IValues {
  min: number;
  max: number;
}

interface IProps {
  bounds: IValues;
  values: IValues;
}

const validateValuesByMinMaxBounds = ({ bounds, values }: IProps) => {
  const { min, max } = bounds;

  return Yup.object({
    min: Yup.number().min(min, `Min value can not be less than ${min}.`),
    max: Yup.number()
      .max(max, `Max value can not be greater than ${max}.`)
      .min(min, `Max value can not be less than ${min}.`),
  }).validate(values);
};

export default validateValuesByMinMaxBounds;
