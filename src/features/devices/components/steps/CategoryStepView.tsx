import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '@src/common/components/CustomSelect/CustomSelect';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { categoriesSelector } from '@features/categories/selectors/categoriesSelector';
import { ICategory } from '@src/features/categories/types';
import { NewCategorySchema } from '@src/features/auth/validation/categorySchema';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { newDeviceRoutes } from '../../pages/NewDeviceView';
import {
  FormFooter,
  FormWrap,
  NextButton,
  PrevLink,
} from '../../styles/deviceForm.styled';

function CategoryStepView() {
  return (
    <FormWrap>
      <CategoryFormView />
    </FormWrap>
  );
}

const initialValues = {
  name: '',
};

function CategoryFormView() {
  const context = useNewDeviceContext();
  const navigate = useNavigate();

  const formik = useFormik<{ name: string }>({
    initialValues,
    validationSchema: NewCategorySchema,
    onSubmit: ({ name }) => {
      context.addCategory(name);
      navigate(newDeviceRoutes.info);
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CategorySelect formik={formik} />

      <FormFooter>
        <PrevLink to={newDeviceRoutes.brand}>Prev</PrevLink>
        <NextButton type="submit" disabled={isDisabled}>
          Next
        </NextButton>
      </FormFooter>
    </form>
  );
}

function CategorySelect({ formik }: { formik: FormikProps<{ name: string }> }) {
  const context = useNewDeviceContext();
  const categories = useTypedSelector(categoriesSelector);

  const [state, setState] = useState({
    isClearable: true,
    isSearchable: true,
    isDisabled: false,
    isLoading: false,
  });

  useEffect(() => {
    formik.setFieldValue('name', context.formState.category?.name);
  }, []);

  useEffect(() => {
    if (categories.isLoading) {
      setState((prev) => ({ ...prev, isDisabled: true, isLoading: true }));
    } else {
      setState((prev) => ({ ...prev, isDisabled: false, isLoading: false }));
    }
  }, [categories.isLoading]);

  const options = categories.items.map((category: ICategory) => ({
    value: category.name,
    label: category.name,
  }));

  return (
    <CustomSelect
      formikProps={formik}
      selectorState={state}
      options={options}
      fieldName="name"
      label="Category"
      placeholder="Kindly select category."
    />
  );
}

export default CategoryStepView;
