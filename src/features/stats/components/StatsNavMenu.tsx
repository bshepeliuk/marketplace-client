import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { routes } from '@src/app/Router';

function StatsNavMenu() {
  const [searchParams] = useSearchParams();

  return (
    <Container>
      <StatsLink end to={{ pathname: routes.stats, search: `?${searchParams}` }}>
        devices
      </StatsLink>
      <StatsLink to={{ pathname: `${routes.stats}/customer`, search: `?${searchParams}` }}>customers</StatsLink>
      <StatsLink to={{ pathname: `${routes.stats}/orders`, search: `?${searchParams}` }}>orders</StatsLink>
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
