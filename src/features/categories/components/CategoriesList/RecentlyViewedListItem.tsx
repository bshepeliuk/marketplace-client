import React from 'react';
import { routes } from '@src/app/Router';
import useCheckRecentlyViewed from '@features/recentlyViewed/hooks/useCheckRecentlyViewed';
import { RecentlyListItem, StyledRecentlyLink } from '../../styles/categoriesList.styled';
import RecentlyViewedCounter from '../../atoms/RecentlyViewedCounter';

function RecentlyViewedListItem() {
  const { hasAnyViewedItems } = useCheckRecentlyViewed();

  const hasNoAnyViewedItems = !hasAnyViewedItems();

  if (hasNoAnyViewedItems) return null;

  return (
    <RecentlyListItem>
      <StyledRecentlyLink to={routes.recentlyViewed}>Recently viewed</StyledRecentlyLink>
      <RecentlyViewedCounter />
    </RecentlyListItem>
  );
}

export default RecentlyViewedListItem;
