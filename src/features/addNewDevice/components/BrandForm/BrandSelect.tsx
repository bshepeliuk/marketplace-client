import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import useServeBrandSelect from '../../hooks/useServeBrandSelect';

function BrandSelect({ formik }: { formik: FormikProps<{ name: string }> }) {
  const context = useNewDeviceContext();

  const {
    onCreateOption,
    handleChange,
    loadOptions,
    option,
    options,
    setOption,
    selectState,
  } = useServeBrandSelect();

  useEffect(() => {
    if (option !== null) {
      formik.setFieldValue('name', option.value);
    }
  }, [option]);

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
      placeholder="Please select or create a device brand."
    />
  );
}

export default BrandSelect;
