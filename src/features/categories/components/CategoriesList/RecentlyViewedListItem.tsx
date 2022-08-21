import React from 'react';
import { routes } from '@src/app/Router';
// eslint-disable-next-line max-len
import useCheckRecentlyViewed from '@features/recentlyViewed/hooks/useCheckRecentlyViewed';
import {
  ListItem,
  StyledRecentlyLink,
} from '../../styles/categoriesList.styled';

function RecentlyViewedListItem() {
  const { hasAnyViewedItems } = useCheckRecentlyViewed();

  const hasNoAnyViewedItems = !hasAnyViewedItems();

  if (hasNoAnyViewedItems) return null;

  return (
    <ListItem>
      <StyledRecentlyLink to={routes.recentlyViewed}>
        Recently viewed
      </StyledRecentlyLink>
    </ListItem>
  );
}

export default RecentlyViewedListItem;
