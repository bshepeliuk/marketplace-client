import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const PaginationItem = styled.li<{ isActive: boolean }>`
  padding: 9px 15px;
  background-color: ${(props) => (props.isActive ? '#f2f2f2' : 'transparent')};
  color: ${(props) => (props.isActive ? '#303030' : '#5285cc')};
  border-radius: 2px;
  transition: all 0.3s ease-out;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
    color: #303030;
  }
`;

export const DotsItem = styled.li`
  padding: 9px;
`;

export const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  color: #5285cc;
  cursor: pointer;

  &:disabled {
    color: #bdc3c7;
  }
`;
