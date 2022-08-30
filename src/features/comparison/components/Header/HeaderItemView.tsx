import { routes } from '@src/app/Router';
import { IDevice, IDeviceImage, IDeviceWithCount } from '@src/features/devices/types';
import useMakePayment from '@src/features/payment/pages/hooks/useMakePayment';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { generatePath, useLocation } from 'react-router-dom';
import useDeleteFromComparison from '../../hooks/useDeleteFromComparison';
import { DeleteIcon, DeviceLink, HeaderListItem, Img, PayButton, Price } from './comparisonHeader.styled';

interface IProps {
  device: IDevice;
  columnId: number;
  onDragEndColumn: (evt: React.MouseEvent) => void;
  onDragLeaveColumn: (evt: React.MouseEvent) => void;
  onDragEnterColumn: (evt: React.MouseEvent) => void;
}

function HeaderItemView({ device, columnId, onDragEndColumn, onDragLeaveColumn, onDragEnterColumn }: IProps) {
  const location = useLocation();
  const { pay, isPending } = useMakePayment([{ ...device, count: 1 }] as IDeviceWithCount[]);
  const { deleteById } = useDeleteFromComparison();

  return (
    <HeaderListItem
      draggable
      data-column-id={columnId}
      onDragEnter={onDragEnterColumn}
      onDragEnd={onDragEndColumn}
      onDragLeave={onDragLeaveColumn}
      key={`header-${device.name}`}
    >
      <Img src={(device.images[0] as IDeviceImage).url} alt={device.name} />

      <DeviceLink
        to={generatePath(routes.device, {
          deviceId: `${device.id}`,
        })}
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
          },
        }}
      >
        {device.name}
      </DeviceLink>

      <DeleteIcon onClick={() => deleteById(device.id)} />

      <Price>{device.price} $</Price>
      <PayButton onClick={pay} disabled={isPending}>
        <AiOutlineShoppingCart />
      </PayButton>
    </HeaderListItem>
  );
}

export default HeaderItemView;
