import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { routes } from '@src/app/Router';
import useFetchDevicesByRequest from '@src/features/devices/hooks/useFetchDevicesByRequest';

interface IProps {
  children: React.ReactNode;
}

function LogoButton({ children }: IProps) {
  const navigate = useNavigate();
  const fetchDevices = useFetchDevicesByRequest();

  const onLogoClick = () => {
    fetchDevices({ filters: [] });
    navigate(routes.home);
  };

  return <Button onClick={onLogoClick}>{children}</Button>;
}

const Button = styled.button`
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Roboto';

  &:hover {
    transform: scale(1.01);
    letter-spacing: 2px;
  }

  @media (max-width: 700px) {
    justify-self: start;
  }
`;

export default LogoButton;
