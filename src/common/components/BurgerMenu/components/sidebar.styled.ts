import styled, { css } from 'styled-components';
import { IoMdClose } from 'react-icons/io';

export const Layout = styled.div<{ isOpen: boolean }>`
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: fixed;
  z-index: 5;
  inset: 0;

  ${({ isOpen }) => {
    return isOpen
      ? css`
          width: 100%;
        `
      : css`
          width: 0;
        `;
  }}
`;

interface ISideBarStyleProps {
  width: number;
  isOpen: boolean;
  color: string;
}

export const SideBarContainer = styled.div<ISideBarStyleProps>`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 6;
  top: 0;
  right: 0;
  background-color: ${(props) => props.color};
  padding: 0px;
  transition: 0.5s;
  overflow-x: hidden;
  border-radius: 5px 0 0 5px;

  ${({ isOpen, width }) => {
    const currentWidth = width
      ? css`
          width: ${width}px;
        `
      : css`
          width: 100%;
        `;

    if (isOpen) return currentWidth;
  }}
`;

export const SideBarContent = styled.div`
  padding: 20px;
  white-space: nowrap;
`;

export const CloseIcon = styled(IoMdClose)`
  font-size: 25px;
  position: relative;
  top: 12px;
  left: 12px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
