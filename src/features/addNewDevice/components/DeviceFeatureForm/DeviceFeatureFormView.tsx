import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { NewDeviceFeatureSchema } from '@features/auth/validation/deviceFeatureSchema';
import CustomInput from '@common/components/CustomInput/CustomInput';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { newDeviceRoutes } from '../../pages/NewDeviceView';
import {
  FeatureFormFooter,
  FeatureNextBtn,
  PrevLink,
} from '../../styles/deviceForm.styled';

const initialValues = {
  title: '',
  description: '',
};

interface IDeviceFeatureProps {
  title: string;
  description: string;
}

function DeviceFeatureFormView() {
  const context = useNewDeviceContext();
  const navigate = useNavigate();

  const formik = useFormik<IDeviceFeatureProps>({
    initialValues,
    validationSchema: NewDeviceFeatureSchema,
    onSubmit: ({ title, description }, { resetForm }) => {
      context.addFeatureDetails({ title, description });
      resetForm();
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);
  const isNextDisabled = context.formState.features.length === 0;

  const onClickNext = () => {
    navigate(newDeviceRoutes.images);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomInput
        id="title"
        label="Title"
        fieldName="title"
        type="text"
        {...formik}
      />

      <CustomInput
        id="description"
        label="Description"
        fieldName="description"
        type="text"
        {...formik}
      />

      <FeatureFormFooter>
        <PrevLink to={newDeviceRoutes.info}>Prev</PrevLink>
        <button type="submit" disabled={isDisabled}>
          add
        </button>
        <FeatureNextBtn
          type="button"
          onClick={onClickNext}
          disabled={isNextDisabled}
        >
          Next
        </FeatureNextBtn>
      </FeatureFormFooter>
    </form>
  );
}

export default DeviceFeatureFormView;
