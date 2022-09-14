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
  onDragEnd: (evt: React.MouseEvent) => void;
  onDragLeave: (evt: React.MouseEvent) => void;
  onDragEnter: (evt: React.MouseEvent) => void;
}

function HeaderItemView({ device, columnId, onDragEnd, onDragEnter, onDragLeave }: IProps) {
  const location = useLocation();
  const { pay, isPending } = useMakePayment([{ ...device, count: 1 }] as IDeviceWithCount[]);
  const { deleteById } = useDeleteFromComparison();

  const onDelete = () => {
    deleteById(device.id);
  };

  return (
    <HeaderListItem
      draggable
      data-column-id={columnId}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      key={`header-${device.name}`}
    >
      {/* FIXME: add placeholder when device does not have images */}
      {device.images.length > 0 && <Img src={(device.images[0] as IDeviceImage).url} alt={device.name} />}

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

      <DeleteIcon data-button="delete-button" onClick={onDelete} />

      <Price>{device.price} $</Price>
      <PayButton data-button="pay-button" onClick={pay} disabled={isPending}>
        <AiOutlineShoppingCart />
      </PayButton>
    </HeaderListItem>
  );
}

export default HeaderItemView;
