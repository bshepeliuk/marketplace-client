import React from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import createOption from '@src/common/utils/createSelectOption';
import { useAppDispatch } from '@common/hooks/useAppDispatch';
import { IOrderStatusOption, OrderStatusValues } from '@src/features/orders/types';
import { Orders } from '@src/common/api/Api';
import { OrderStatus, OrderStatusColor } from '../../../constants';
import { ordersActions } from '../../../ordersSlice';

interface IProps {
  defaultValue: OrderStatusValues;
  orderDeviceId: number;
}

function OrderStatusSelect({ defaultValue, orderDeviceId }: IProps) {
  const dispatch = useAppDispatch();

  const onChange = (option: SingleValue<IOrderStatusOption>) => {
    if (option?.value !== undefined) {
      Orders.changeStatus({ id: orderDeviceId, status: option.value });
      dispatch(ordersActions.updateOrderStatus({ id: orderDeviceId, status: option.value }));
    }
  };

  return (
    <Select
      maxMenuHeight={190}
      menuShouldBlockScroll
      menuPlacement="auto"
      menuPosition="fixed"
      defaultValue={{ label: defaultValue, value: defaultValue }}
      options={options}
      onChange={onChange}
      styles={customStyles}
    />
  );
}

const options: IOrderStatusOption[] = Object.values(OrderStatus).map((status) => createOption(status));

const customStyles: StylesConfig<IOrderStatusOption, false> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', width: 170, cursor: 'pointer' }),
  container: (styles) => ({ ...styles, width: 200 }),
  option: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: OrderStatusColor[data.label as OrderStatusValues],
      padding: '8px 2px',
      borderRadius: '4px',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: '12px',
      letterSpacing: '1px',
    };
  },
};

export default OrderStatusSelect;
