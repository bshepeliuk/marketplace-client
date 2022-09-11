import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
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

export const ListWrap = styled.div`
  grid-column-start: 1;
  justify-self: center;

  @media (max-width: 1000px) {
    grid-column-start: 1;
    order: 2;
  }
`;
