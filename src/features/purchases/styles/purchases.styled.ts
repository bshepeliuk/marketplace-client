import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  overflow-x: auto;
  min-height: calc(var(--default-height) - 40px); // margin top and bottom
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
  width: max-content;
  margin: 0 10px 20px 10px;
`;

export const PaginationContainer = styled.div`
  margin: 30px 0 20px 0;
`;

export const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;
