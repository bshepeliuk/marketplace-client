import React, { useRef, useState } from 'react';
import Select, { ActionMeta, MultiValue, Options, StylesConfig } from 'react-select';
import chroma from 'chroma-js';

import createOption from '@src/common/utils/createSelectOption';
import notifications from '@src/common/utils/notifications';
import { OrderStatus, OrderStatusColor, ORDERS_MULTISELECT_LIMIT } from '../constants';
import { IOrderStatusOptionWithColor } from '../types';

interface IProps {
  onFilterChange: (filters: { status?: string[] }) => void;
  initialValues: string[];
}

function OrderStatusSelector({ onFilterChange, initialValues }: IProps) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [values, setValues] = useState<MultiValue<IOrderStatusOptionWithColor>>(getInitialValues());

  const onChange = (options: MultiValue<IOrderStatusOptionWithColor>) => {
    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);

    if (options.length === ORDERS_MULTISELECT_LIMIT) {
      notifications.info(`Only ${ORDERS_MULTISELECT_LIMIT} status options can be added to filter.`);
    }

    setValues(options);

    timeoutId.current = setTimeout(() => {
      const optionValues = options.map((item) => item.value);
      const status = optionValues.length > 0 ? optionValues : undefined;

      onFilterChange({ status });
    }, 1000);
  };

  const isOptionDisabled = (_: IOrderStatusOptionWithColor, selectValue: Options<IOrderStatusOptionWithColor>) => {
    return selectValue.length >= ORDERS_MULTISELECT_LIMIT;
  };

  function getInitialValues() {
    return statusOptions.filter((option) => {
      return initialValues.includes(option.value.toUpperCase()) || initialValues.includes(option.value.toLowerCase());
    });
  }

  return (
    <div>
      <Select
        isMulti
        closeMenuOnSelect={false}
        placeholder="Order status"
        options={statusOptions}
        styles={statusStyles}
        value={values}
        isOptionDisabled={isOptionDisabled}
        onChange={onChange}
      />
    </div>
  );
}

const statusOptions: IOrderStatusOptionWithColor[] = Object.values(OrderStatus).map((status) => ({
  ...createOption(status),
  color: OrderStatusColor[status],
}));

const statusStyles: StylesConfig<IOrderStatusOptionWithColor, true> = {
  container: (styles) => ({ ...styles, minWidth: 150, width: 'max-content' }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: '0 !important',
    width: '100%',
  }),
  option: (styles) => {
    return {
      ...styles,
    };
  },
  placeholder: (styles) => ({ ...styles, fontSize: 15 }),
  valueContainer: (styles) => ({ ...styles }),
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.15).css(),
      color: '#fff',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,

    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

export default OrderStatusSelector;
