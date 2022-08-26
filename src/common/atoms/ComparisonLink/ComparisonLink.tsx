import React from 'react';
import { routes } from '@src/app/Router';
import useGetComparisonList from '@features/comparison/hooks/useGetComparisonList';
import { Link } from 'react-router-dom';
import { Counter, CounterText, Icon, Wrap } from './comparison.styled';

function ComparisonLink() {
  return (
    <Wrap>
      <Link to={routes.comparison}>
        <Icon />
        <ComparisonCounter />
      </Link>
    </Wrap>
  );
}

function ComparisonCounter() {
  const { items } = useGetComparisonList();

  const hasNoItems = items.length === 0;

  if (hasNoItems) return null;

  return (
    <Counter>
      <CounterText key={items.length}>{items.length}</CounterText>
    </Counter>
  );
}

export default ComparisonLink;
