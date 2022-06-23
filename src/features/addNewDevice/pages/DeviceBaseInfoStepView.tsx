import React, { useEffect } from 'react';
import CustomInput from '@src/common/components/CustomInput/CustomInput';
import { NewDeviceSchema } from '@src/features/auth/validation/newDeviceSchema';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useNewDeviceContext from '../hooks/useNewDeviceContext';
import { newDeviceRoutes } from './NewDeviceView';
import {
  FormFooter,
  FormWrap,
  NextButton,
  PrevLink,
} from '../styles/deviceForm.styled';

function DeviceBaseInfoStepView() {
  return (
    <FormWrap>
      <BaseInfoFormView />
    </FormWrap>
  );
}

const initialValues = {
  name: '',
  price: '',
  quantity: '',
};

interface IBaseInfoProps {
  name: string;
  price: string;
  quantity: string;
}

function BaseInfoFormView() {
  const context = useNewDeviceContext();
  const navigate = useNavigate();

  const formik = useFormik<IBaseInfoProps>({
    initialValues,
    validationSchema: NewDeviceSchema,
    onSubmit: ({ name, quantity, price }) => {
      context.addBaseInfo({ name, quantity, price });
      navigate(newDeviceRoutes.details);
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  useEffect(() => {
    const { info } = context.formState;
    if (info !== null) {
      formik.setValues(info);
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomInput
        id="name"
        label="Name"
        fieldName="name"
        type="text"
        {...formik}
      />

      <CustomInput
        id="price"
        label="Price"
        fieldName="price"
        type="text"
        {...formik}
      />

      <CustomInput
        id="quantity"
        label="Quantity"
        fieldName="quantity"
        type="text"
        {...formik}
      />

      <FormFooter>
        <PrevLink to={newDeviceRoutes.category}>Prev</PrevLink>
        <NextButton type="submit" disabled={isDisabled}>
          Next
        </NextButton>
      </FormFooter>
    </form>
  );
}

export default DeviceBaseInfoStepView;
