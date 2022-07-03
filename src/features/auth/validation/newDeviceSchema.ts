import * as Yup from 'yup';

export const NewDeviceSchema = Yup.object({
  name: Yup.string().required('Required'),
  quantity: Yup.number()
    .typeError('Must be a number.')
    .positive()
    .required('Required'),
  price: Yup.number()
    .typeError('Must be a number.')
    .positive()
    .required('Required'),
});
