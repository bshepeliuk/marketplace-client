import styled from 'styled-components';

export const DeviceListContainer = styled.div`
  grid-column: 2 / 3;
  grid-row-start: 1;
  max-width: 1200px;

  @media (max-width: 1600px) {
    max-width: 900px;
  }

  @media (max-width: 996px) {
    max-width: 605px;
  }

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1200px;
  justify-content: center;

  @media (max-width: 1600px) {
    grid-template-columns: 400px 900px;
  }

  @media (max-width: 1340px) {
    grid-template-columns: 400px 605px;
  }

  @media (max-width: 1020px) {
    grid-template-columns: 400px 320px;
  }
`;
