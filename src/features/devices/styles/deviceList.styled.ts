import styled from 'styled-components';

// Header - 80px;
export const Wrap = styled.div`
  flex: 1 1 auto;
  height: calc(100vh - 80px);
`;

export const GoToTopButton = styled.button`
  position: fixed;
  z-index: 1;
  bottom: 15px;
  right: 15px;
`;
