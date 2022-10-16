import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin: 0 10px 20px 10px;
  width: max-content;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  overflow-x: auto;
  min-height: calc(var(--default-height) - 40px); // margin top and bottom
`;

export const PaginationContainer = styled.div`
  margin: 30px 0 20px 0;
`;
