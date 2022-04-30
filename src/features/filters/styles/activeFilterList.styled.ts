import styled, { css } from 'styled-components';

export const Container = styled.div<{ isScrolling: boolean }>`
  grid-row-start: 1;
  grid-column-start: 1;
  z-index: 1;
  grid-column-end: 3;
  height: max-content;
  margin-top: -75px;
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  display: flex;
  padding: 10px;

  cursor: ${({ isScrolling }) => {
    return isScrolling ? css`grabbing` : css`pointer`;
  }};

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }
`;

export const List = styled.ul`
  display: flex;
`;

export const ListItem = styled.li`
  height: 40px;
  margin-right: 20px;
  background-color: #f2f2f2;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: #303030;
  user-select: none;
  align-items: center;

  &:hover {
    box-shadow: 0px 10px 10px -7px rgb(52 152 219 / 20%);
  }
`;

export const ClearAllButton = styled.button`
  color: #3498db;
  border: 1px solid currentColor;
  border-radius: 4px;
  background-color: #fff;
  padding: 10px 20px;
  height: 40px;
  margin-right: 25px;

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
