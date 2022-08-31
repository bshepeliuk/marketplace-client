import styled from 'styled-components';

export const FoundListContainer = styled.div`
  max-width: 1200px;
  height: var(--default-height);
  margin: 0 auto;

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
