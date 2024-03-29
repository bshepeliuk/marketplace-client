import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

export const Layout = styled.div`
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: fixed;
  z-index: 15;
  width: 100%;
  inset: 0;
`;

interface ISideBarStyleProps {
  isOpen: boolean;
  color: string;
}

export const SideBarContainer = styled.div<ISideBarStyleProps>`
  height: 100%;
  width: 360px;
  position: fixed;
  z-index: 6;
  top: 0;
  right: 0;
  background-color: ${(props) => props.color};
  padding: 0px;
  transition: 0.5s;
  overflow-x: hidden;
  border-radius: 5px 0 0 5px;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(360px)')};
`;

export const SideBarContent = styled.div`
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
