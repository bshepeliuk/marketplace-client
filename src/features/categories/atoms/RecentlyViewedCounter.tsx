import React from 'react';
import useGetRecentlyViewed from '@src/features/recentlyViewed/hooks/useGetRecentlyViewed';
import styled from 'styled-components';

function RecentlyViewedCounter() {
  const items = useGetRecentlyViewed();

  const hasNoItems = items.length === 0;

  if (hasNoItems) return null;

  return (
    <Counter>
      <Text key={items.length}>{items.length}</Text>
    </Counter>
  );
}

const Counter = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 3px;
  min-width: 20px;
  max-width: 44px;
  height: 20px;
  background-color: #e31837;
  border-radius: 10px;
  color: #fff;
  justify-content: center;
  position: absolute;
  top: -14px;
  right: -9px;
`;

const Text = styled.p`
  margin: 0;
`;

export default RecentlyViewedCounter;
