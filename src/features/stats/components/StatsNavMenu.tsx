import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { routes } from '@src/app/Router';
import { Container, StatsLink } from '../styles/statsNavMenu.styled';

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

export default StatsNavMenu;
