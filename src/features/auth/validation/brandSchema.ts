import * as Yup from 'yup';

export const NewBrandSchema = Yup.object({
  name: Yup.string().required('Required'),
});
