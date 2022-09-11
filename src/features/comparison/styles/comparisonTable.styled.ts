import styled from 'styled-components';

export const ComparisonTable = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  overflow-x: auto;
  padding: 50px 10px 15px 10px;

  &::-webkit-scrollbar {
    height: 15px;
    border: 1px solid #d5d5d5;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(236, 240, 241, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--default-height);
`;
