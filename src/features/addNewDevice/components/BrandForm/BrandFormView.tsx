import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { NewBrandSchema } from '@src/features/auth/validation/brandSchema';
import useGetBrands from '@features/brands/hooks/useGetBrands';
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
  const { items } = useGetBrands();

  const formik = useFormik<{ name: string }>({
    initialValues,
    validationSchema: NewBrandSchema,
    onSubmit: ({ name }) => {
      const brand = items.find((i) => i.name.toLowerCase() === name.toLocaleLowerCase());

      if (brand !== undefined) {
        context.addBrand({ brand });
      }

      navigate(newDeviceRoutes.category);
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <form onSubmit={formik.handleSubmit}>
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
