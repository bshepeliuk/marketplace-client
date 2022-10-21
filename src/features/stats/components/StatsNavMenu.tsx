import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { routes } from '@src/app/Router';

function StatsNavMenu() {
  return (
    <Container>
      <StatsLink end to={routes.stats}>
        devices
      </StatsLink>
      <StatsLink to={`${routes.stats}/customer`}>customers</StatsLink>
      <StatsLink to={`${routes.stats}/orders`}>orders</StatsLink>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1400px;
  display: flex;
  gap: 20px;
  padding: 30px 0;
  margin: 0 20px;
`;

const StatsLink = styled(NavLink)`
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
  color: #d6e4f0;
  font-weight: bold;
  position: relative;

  &.active {
    color: #34495e;
  }

  &:hover {
    color: #34495e;
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    display: block;
    background-color: #34495e;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s ease-out;
  }

  &.active::after {
    transition-delay: 0.25s;
    transform: scaleX(1);
  }
`;

export default StatsNavMenu;
