import { FaFilter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import styled, { keyframes } from 'styled-components';

export const FilterIcon = styled(FaFilter)`
  color: rgba(52, 152, 219, 1);
  font-size: 1.4em;

  &:hover {
    color: rgba(52, 152, 219, 0.8);
  }
`;

export const FilterMenuOverlay = styled.div`
  background-color: rgba(52, 73, 94, 0.2);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const animateOpenByWidth = (width: number) => keyframes`
0% {
  width: 0;
  opacity: 0;
}

100% {
  width: ${width}px;
  opacity: 1;
}
`;

export const MenuContainer = styled.div<{ isOpen: boolean }>`
  background-color: #fff;
  height: 100%;
  padding-top: 20px;
  overflow-y: scroll;
  position: relative;
  width: 400px;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-400px)')};

  @media (max-width: 400px) {
    width: 320px;
  }
`;

export const CloseIcon = styled(IoMdClose)`
  color: #34495e;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const InteractionWrap = styled.div`
  padding-top: 50px;
`;

export const ApplyButton = styled.button`
  cursor: pointer;
  width: 50%;
  height: 45px;
  background-color: #5285cc;
  border: none;
  color: #fff;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover {
    background-color: #7fb5ff;
  }
`;

export const ClearButton = styled.button`
  cursor: pointer;
  width: 50%;
  height: 45px;
  border: none;
  background-color: #f2f2f2;
  transition: all 0.3s;
  text-transform: uppercase;
  color: #303030;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  font-size: 1.7em;
  cursor: pointer;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: 4px;
`;

export const OpenFilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ClearFilterButton = styled.button`
  color: #3498db;
  border: 1px solid currentColor;
  border-radius: 3px;
  background-color: #fff;
  padding: 0px 15px;
  height: 40px;
  text-transform: uppercase;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #3498db;
    color: #fff;
  }
`;

export const Wrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
