import React from 'react';
import useGetDevicesByRequest from '@src/features/devices/hooks/useGetDevicesByRequest';
import { CategoryButton } from '../styles/categoriesList.styled';

function GetAllDevicesButton(props: {
  active: string | null;
  onAllClick: () => void;
}) {
  const { getAll } = useGetDevicesByRequest();

  const isActive = props.active === null;

  const handleClick = () => {
    getAll();
    props.onAllClick();
  };

  return (
    <CategoryButton type="button" onClick={handleClick} isActive={isActive}>
      All
    </CategoryButton>
  );
}

export default GetAllDevicesButton;
