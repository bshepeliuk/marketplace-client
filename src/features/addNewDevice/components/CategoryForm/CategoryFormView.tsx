import React from 'react';
import { NewCategorySchema } from '@src/features/auth/validation/categorySchema';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { categoriesSelector } from '@features/categories/selectors/categoriesSelector';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import {
  FormFooter,
  NextButton,
  PrevLink,
} from '../../styles/deviceForm.styled';
import CategorySelect from './CategorySelect';
import { newDeviceRoutes } from '../../pages/NewDeviceView';

const initialValues = {
  name: '',
};

function CategoryFormView() {
  const context = useNewDeviceContext();
  const navigate = useNavigate();
  const { items } = useTypedSelector(categoriesSelector);

  const formik = useFormik<{ name: string }>({
    initialValues,
    validationSchema: NewCategorySchema,
    onSubmit: ({ name }) => {
      const category = items.find(
        (i) => i.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      );

      if (category !== undefined) {
        context.addCategory({ category });
      }

      navigate(newDeviceRoutes.info);
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CategorySelect formik={formik} />

      <FormFooter>
        <PrevLink to={newDeviceRoutes.brand}>prev</PrevLink>
        <NextButton type="submit" disabled={isDisabled}>
          next
        </NextButton>
      </FormFooter>
    </form>
  );
}

export default CategoryFormView;
