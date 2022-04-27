import styled from 'styled-components';

export const DeviceListContainer = styled.div`
  max-width: 1200px;
  // 80px - header; 80px - margin-bottom;
  height: calc(100vh - 80px - 80px);
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 900px;
  }

  @media (max-width: 996px) {
    max-width: 605px;
  }

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;
