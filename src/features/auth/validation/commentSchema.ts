import * as Yup from 'yup';

export const CommentSchema = Yup.object({
  body: Yup.string().required('Comment is required'),
});
