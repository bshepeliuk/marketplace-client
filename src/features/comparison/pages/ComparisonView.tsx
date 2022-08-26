import React from 'react';
import styled from 'styled-components';
import useGetComparisonList from '../hooks/useGetComparisonList';
import useGetComparisonOptions from '../hooks/useGetComparisonOptions';

function ComparisonView() {
  const { items } = useGetComparisonList();
  const options = useGetComparisonOptions(items);

  const data = options.map(([key, value]) => [key, ...value]);
  const devices = items.map((device) => device.name);

  const rows = [['OPTIONS', ...devices], ...data];

  return (
    <Container>
      {rows.map((item) => {
        return (
          <List columns={items.length + 1}>
            {item.map((value) => {
              return <li>{value}</li>;
            })}
          </List>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const List = styled.ul<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
  grid-auto-rows: 50px;
`;

export default ComparisonView;
