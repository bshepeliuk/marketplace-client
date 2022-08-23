import React from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { ListItem, StyledLink } from '../../styles/categoriesList.styled';

function AllDevicesListItem() {
  const location = useLocation();
  // prettier-ignore
  const isActive = location.pathname === routes.home && location.search === "";
  const className = isActive ? 'active-category' : '';

  return (
    <ListItem>
      <StyledLink className={className} to={routes.home}>
        All
      </StyledLink>
    </ListItem>
  );
}

export default AllDevicesListItem;
