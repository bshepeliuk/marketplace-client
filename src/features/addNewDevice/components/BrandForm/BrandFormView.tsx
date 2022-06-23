import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { NewBrandSchema } from '@src/features/auth/validation/brandSchema';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { newDeviceRoutes } from '../../pages/NewDeviceView';
import { FormFooter, NextButton } from '../../styles/deviceForm.styled';
import BrandSelect from './BrandSelect';

const initialValues = {
  name: '',
};

function BrandFormView() {
  const context = useNewDeviceContext();
  const navigate = useNavigate();

  const formik = useFormik<{ name: string }>({
    initialValues,
    validationSchema: NewBrandSchema,
    onSubmit: ({ name }) => {
      context.addBrand(name);
      navigate(newDeviceRoutes.category);
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Brand.</h1>
      <BrandSelect formik={formik} />

      <FormFooter>
        <NextButton type="submit" disabled={isDisabled}>
          Next
        </NextButton>
      </FormFooter>
    </form>
  );
}

export default BrandFormView;
