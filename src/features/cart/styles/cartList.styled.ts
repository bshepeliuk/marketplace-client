import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 40px;
  padding: 0 20px;

  @media (max-width: 1000px) {
    grid-template-columns: 650px;
    justify-content: center;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
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

  &:disabled {
    background-color: #bdc3c7;
  }
`;
