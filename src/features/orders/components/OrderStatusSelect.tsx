import React from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import createOption from '@src/common/utils/createSelectOption';
import { OrderStatus, OrderStatusValues } from '@src/features/purchases/types';
import { useAppDispatch } from '@common/hooks/useAppDispatch';
import { Orders } from '@src/common/api/Api';
import { OrderStatusColor } from '../constants';
import { ordersActions } from '../ordersSlice';

interface IProps {
  defaultValue: OrderStatusValues;
  orderDeviceId: number;
}

interface StatusOption {
  readonly label: OrderStatusValues;
  readonly value: OrderStatusValues;
}

function OrderStatusSelect({ defaultValue, orderDeviceId }: IProps) {
  const dispatch = useAppDispatch();
  const options: StatusOption[] = Object.values(OrderStatus).map((status) => createOption(status));

  const customStyles: StylesConfig<StatusOption, false> = {
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

  const onChange = (option: SingleValue<StatusOption>) => {
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

export default OrderStatusSelect;
