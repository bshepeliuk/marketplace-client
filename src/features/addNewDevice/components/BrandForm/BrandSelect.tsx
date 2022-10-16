import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import useServeBrandSelect from '../../hooks/useServeBrandSelect';

function BrandSelect({ formik }: { formik: FormikProps<{ name: string }> }) {
  const context = useNewDeviceContext();
  // prettier-ignore
  const {
    onCreateOption,
    handleChange,
    loadOptions,
    option,
    options,
    setOption,
    selectState,
    shouldClear,
  } = useServeBrandSelect();

  useEffect(() => {
    if (option !== null) {
      formik.setFieldValue('name', option.value);
    }
  }, [option]);

  useEffect(() => {
    if (shouldClear) {
      formik.resetForm();
      context.clearBrand();
    }
  }, [shouldClear]);

  useEffect(() => {
    const { brand } = context.formState;

    if (brand !== null) {
      formik.setFieldValue('name', brand.name);

      setOption({
        label: brand.name,
        value: brand.name,
      });
    }
  }, []);

  return (
    <AsyncCreatableSelect
      inputId="brand-select"
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
      placeholder="Please select or create device brand."
    />
  );
}

export default BrandSelect;
