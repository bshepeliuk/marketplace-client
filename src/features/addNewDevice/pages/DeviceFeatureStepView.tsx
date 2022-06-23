import CustomInput from '@src/common/components/CustomInput/CustomInput';
import { NewDeviceFeatureSchema } from '@features/auth/validation/deviceFeatureSchema';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useNewDeviceContext from '../hooks/useNewDeviceContext';
import { newDeviceRoutes } from './NewDeviceView';
import {
  FormFooter,
  FormWrap,
  NextButton,
  PrevLink,
} from '../styles/deviceForm.styled';

function DeviceFeatureStepView() {
  return (
    <FormWrap>
      <DeviceFeatureFormView />
      <DeviceFeatureList />
    </FormWrap>
  );
}

function DeviceFeatureList() {
  const { formState, deleteFeatureDetails } = useNewDeviceContext();

  return (
    <ul>
      {formState.features.map((item) => (
        <li key={item.title + item.description}>
          {item.title}: {item.description}
          <button type="button" onClick={() => deleteFeatureDetails(item)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

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

      <FormFooter>
        <PrevLink to={newDeviceRoutes.info}>Prev</PrevLink>
        <button type="submit" disabled={isDisabled}>
          add
        </button>
        <NextButton
          type="button"
          onClick={onClickNext}
          disabled={isNextDisabled}
        >
          Next
        </NextButton>
      </FormFooter>
    </form>
  );
}

export default DeviceFeatureStepView;
