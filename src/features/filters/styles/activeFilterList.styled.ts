import styled from 'styled-components';

export const Container = styled.div`
  grid-row-start: 1;
  grid-column-start: 2;
  z-index: 1;
  grid-column-end: 3;
  height: max-content;
  margin-top: -50px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  padding: 10px;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }
`;

export const List = styled.ul`
  display: flex;

  li {
    height: 40px;
    margin-right: 20px;
    background-color: #f2f2f2;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: #303030;
    user-select: none;
    align-items: center;
  }
`;

export const ClearAllButton = styled.button`
  color: #3498db;
  border: 1px solid currentColor;
  border-radius: 4px;
  background-color: #fff;
  padding: 10px 20px;
  height: 40px;

  &:hover {
    background-color: #3498db;
    color: #fff;
  }
`;

export const DeleteButton = styled.button`
  margin-left: 10px;
  border: none;
  color: #3498db;
`;
