import styled, { css } from 'styled-components';
import { removeFilterItem, showFilterItem } from './filterAnimation.styled';

export const Wrap = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
  z-index: 1;
  grid-column-end: 3;
  margin-top: -75px;
  display: flex;
  height: max-content;
  align-items: center;
`;

export const ScrollContainer = styled.div<{ isScrolling: boolean }>`
  height: max-content;

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

export const ListItem = styled.li<{
  isMounted: boolean;
  width: number;
}>`
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
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  animation: ${({ isMounted }) => {
    if (isMounted) return css`0.3s ${showFilterItem} ease-in-out backwards`;

    return css`
      520ms ${({ width }: { width: number }) => removeFilterItem(width)} ease-in
    `;
  }};

  &:hover {
    box-shadow: 0px 10px 10px -7px rgb(52 152 219 / 20%);
    transform: scale(1.1);
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

const ScrollArrowButton = styled.button`
  height: 40px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  position: relative;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.4);
  }
`;

export const LeftArrowButton = styled(ScrollArrowButton)<{
  isLeftVisible: boolean;
}>`
  display: ${({ isLeftVisible }) => {
    return isLeftVisible ? 'flex' : 'none';
  }};

  &::after {
    content: '';
    background: linear-gradient(to right, #fff 10%, rgba(249, 249, 249, 0) 90%);
    height: 40px;
    width: 30px;
    position: absolute;
    display: block;
    left: 28px;
  }
`;
export const RightArrowButton = styled(ScrollArrowButton)<{
  isRightVisible: boolean;
}>`
  display: ${({ isRightVisible }) => {
    return isRightVisible ? 'flex' : 'none';
  }};

  &::before {
    content: '';
    background: linear-gradient(to left, #fff 20%, rgba(255, 255, 255, 0) 80%);
    height: 40px;
    width: 30px;
    display: block;
    position: absolute;
    right: 28px;
  }
`;
