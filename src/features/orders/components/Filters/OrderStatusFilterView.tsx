import React from 'react';
import Select, { ActionMeta, MultiValue, Options, StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { useSearchParams } from 'react-router-dom';
import createOption from '@src/common/utils/createSelectOption';
import notifications from '@src/common/utils/notifications';
import { OrderStatus, OrderStatusColor, ORDERS_LIMIT } from '../../constants';
import { IOrderStatusOption } from '../../types';
import useGetOrders from '../../hooks/useGetOrders';

interface IOrderStatusOptionWithColor extends IOrderStatusOption {
  color: string;
}

function OrderStatusFilterView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchOrders } = useGetOrders();

  const FIRST_PAGE = 1;

  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

  const hasSearchParam = ({ name, value }: { name: string; value: string }) => {
    return searchParams.getAll(name).includes(value);
  };

  const onChange = (
    options: MultiValue<IOrderStatusOptionWithColor>,
    meta: ActionMeta<IOrderStatusOptionWithColor>,
  ) => {
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

    setSearchParams(searchParams);

    fetchOrders({
      limit: ORDERS_LIMIT,
      offset,
      filters: [...searchParams.entries()].filter(([key]) => key !== 'page'), // TODO: create helper;
    });
  };

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
  container: (styles) => ({ ...styles, minWidth: 150 }),
  control: (styles) => ({ ...styles, backgroundColor: 'white', boxShadow: '0 !important', width: 'max-content' }),
  option: (styles) => {
    return {
      ...styles,
    };
  },
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
