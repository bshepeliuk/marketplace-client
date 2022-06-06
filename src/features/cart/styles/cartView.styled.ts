import styled from 'styled-components';

export const PayWrapper = styled.div`
  grid-column-start: 2;

  @media (max-width: 1000px) {
    grid-column-start: 1;
    order: 1;
    justify-self: end;
    margin-bottom: 20px;
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    column-gap: 30px;
  }

  @media (max-width: 700px) {
    justify-self: center;
    display: flex;
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

export const TotalPrice = styled.p`
  justify-self: end;

  @media (max-width: 1000px) {
    justify-self: end;
    font-size: 20px;
    margin: 0;
    align-self: center;
  }
`;
