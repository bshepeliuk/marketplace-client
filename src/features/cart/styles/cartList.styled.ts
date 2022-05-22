import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 650px 360px;
  grid-column-gap: 40px;
`;

export const PayButton = styled.button`
  background-color: #e31837;
  height: 48px;
  width: 250px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
`;
