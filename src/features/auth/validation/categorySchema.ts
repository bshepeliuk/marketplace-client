import * as Yup from 'yup';

export const NewCategorySchema = Yup.object({
  name: Yup.string().required('Required'),
});
