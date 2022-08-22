import React from 'react';
import { routes } from '@src/app/Router';
// eslint-disable-next-line max-len
import useCheckRecentlyViewed from '@features/recentlyViewed/hooks/useCheckRecentlyViewed';
import {
  RecentlyListItem,
  StyledRecentlyLink,
} from '../../styles/categoriesList.styled';

function RecentlyViewedListItem() {
  const { hasAnyViewedItems } = useCheckRecentlyViewed();

  const hasNoAnyViewedItems = !hasAnyViewedItems();

  if (hasNoAnyViewedItems) return null;

  return (
    <RecentlyListItem>
      <StyledRecentlyLink to={routes.recentlyViewed}>
        Recently viewed
      </StyledRecentlyLink>
    </RecentlyListItem>
  );
}

export default RecentlyViewedListItem;
