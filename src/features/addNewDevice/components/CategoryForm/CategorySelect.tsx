import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import createOption from '@common/utils/createSelectOption';
import useServeCategorySelect from '../../hooks/useServeCategorySelect';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';

function CategorySelect({ formik }: { formik: FormikProps<{ name: string }> }) {
  const context = useNewDeviceContext();
  const {
    onCreateOption,
    loadOptions,
    handleChange,
    option,
    options,
    setOption,
    shouldClear,
    selectState,
  } = useServeCategorySelect();

  useEffect(() => {
    const { category } = context.formState;

    if (category !== null) {
      formik.setFieldValue('name', category.name);
      setOption(createOption(category.name));
    }
  }, []);

  useEffect(() => {
    if (option !== null) {
      formik.setFieldValue('name', option.value);
    } else {
      formik.resetForm();
    }
  }, [option]);

  useEffect(() => {
    if (shouldClear) {
      formik.resetForm();
      context.clearCategory();
    }
  }, [shouldClear]);

  return (
    <AsyncCreatableSelect
      cacheOptions
      defaultOptions={options}
      isClearable={selectState.isClearable}
      isDisabled={selectState.isDisabled}
      isLoading={selectState.isLoading}
      isSearchable={selectState.isSearchable}
      onCreateOption={onCreateOption}
      loadOptions={loadOptions}
      value={option}
      onChange={handleChange}
      placeholder="Please select or create device category."
    />
  );
}

export default CategorySelect;
