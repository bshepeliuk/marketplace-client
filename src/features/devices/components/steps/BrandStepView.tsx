import { NewBrandSchema } from '@src/features/auth/validation/brandSchema';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CustomSelect from '@src/common/components/CustomSelect/CustomSelect';
import { IBrand } from '@src/features/brands/types';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { newDeviceRoutes } from '../../pages/NewDeviceView';
import {
  FormWrap,
  FormFooter,
  NextButton,
} from '../../styles/deviceForm.styled';

function BrandStepView() {
  return (
    <FormWrap>
      <BrandFormView />
    </FormWrap>
  );
}

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
      <BrandSelect formik={formik} />

      <FormFooter>
        <NextButton type="submit" disabled={isDisabled}>
          Next
        </NextButton>
      </FormFooter>
    </form>
  );
}

function BrandSelect({ formik }: { formik: FormikProps<{ name: string }> }) {
  const context = useNewDeviceContext();
  const brands = useTypedSelector((state) => state.brands);

  const [state, setState] = useState({
    isClearable: true,
    isSearchable: true,
    isDisabled: false,
    isLoading: false,
  });

  useEffect(() => {
    formik.setFieldValue('name', context.formState.brand?.name);
  }, []);

  useEffect(() => {
    if (brands.isLoading) {
      setState((prev) => ({ ...prev, isDisabled: true, isLoading: true }));
    } else {
      setState((prev) => ({ ...prev, isDisabled: false, isLoading: false }));
    }
  }, [brands.isLoading]);

  const options = brands.items.map((brand: IBrand) => ({
    value: brand.name,
    label: brand.name,
  }));

  return (
    <CustomSelect
      formikProps={formik}
      selectorState={state}
      options={options}
      fieldName="name"
      label="Brand"
      placeholder="Kindly select brand."
    />
  );
}

export default BrandStepView;
