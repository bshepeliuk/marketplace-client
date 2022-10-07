import React, { useEffect, useRef, useState } from 'react';
import Select, { ActionMeta, MultiValue, Options, StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import createOption from '@src/common/utils/createSelectOption';
import notifications from '@src/common/utils/notifications';
import { OrderStatus, OrderStatusColor } from '../constants';
import { IOrderStatusOption } from '../types';

interface IOrderStatusOptionWithColor extends IOrderStatusOption {
  color: string;
}

interface IProps {
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
}

function OrderStatusFilterView({ onFilterChange }: IProps) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [values, setValues] = useState<MultiValue<IOrderStatusOptionWithColor>>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const hasSearchParam = ({ name, value }: { name: string; value: string }) => {
    return searchParams.getAll(name).includes(value);
  };

  useEffect(() => {
    const statusValues = searchParams.getAll('status');

    const optionsFromParams = statusOptions.filter((option) => {
      return statusValues.includes(option.value.toUpperCase()) || statusValues.includes(option.value.toLowerCase());
    });

    setValues(optionsFromParams);
  }, []);

  const onChange = (
    options: MultiValue<IOrderStatusOptionWithColor>,
    meta: ActionMeta<IOrderStatusOptionWithColor>,
  ) => {
    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);

    searchParams.delete('page');

    if (meta.action === 'remove-value') {
      const filteredOptions = statusOptions.filter((option) => {
        return option.value.toLowerCase() === meta.removedValue.value.toLowerCase();
      });

      searchParams.delete('status');

      for (const item of filteredOptions) {
        searchParams.append('status', item.value);
      }
    }

    if (meta.action === 'clear') {
      searchParams.delete('status');
    }

    if (options.length === ORDERS_MULTISELECT_LIMIT) {
      notifications.info(`Only ${ORDERS_MULTISELECT_LIMIT} status options can be added to filter.`);
    }

    for (const option of options) {
      if (!hasSearchParam({ name: 'status', value: option.value })) {
        searchParams.append('status', option.value);
      }
    }

    setValues(options);
    setSearchParams(searchParams);

    timeoutId.current = setTimeout(() => {
      const filters = getOrderFilterParams();

      onFilterChange(filters);
    }, 1000);
  };

  const getOrderFilterParams = () => [...searchParams.entries()].filter(([key]) => key !== 'page');

  const isOptionDisabled = (_: IOrderStatusOptionWithColor, selectValue: Options<IOrderStatusOptionWithColor>) => {
    return selectValue.length >= ORDERS_MULTISELECT_LIMIT;
  };

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

const ORDERS_MULTISELECT_LIMIT = 4;

export default OrderStatusFilterView;
