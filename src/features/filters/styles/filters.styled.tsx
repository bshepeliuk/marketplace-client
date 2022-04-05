import React from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

interface IBtnProps {
  btnVerticalOffset: number;
  shouldShow: boolean;
}

export const SideBar = styled.div`
  border: 1px solid rgba(189, 195, 199, 0.4);
  padding: 20px 15px;
  height: calc(100vh - 80px);
  overflow: auto;
  overflow-x: hidden;
  border-radius: 5px;
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background-color: rgba(236, 240, 241, 0.5);
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(52, 73, 94, 0.5);
  }
`;

export const AccordingHeader = styled.div`
  background-color: rgba(189, 195, 199, 0.2);
  margin-bottom: 5px;
  display: flex;
  padding: 10px 5px;
  align-items: center;
  border-radius: 4px;
  user-select: none;
`;

export const AccordionInfo = styled.div`
  display: flex;
  margin-bottom: 5px;
  user-select: none;
`;

export const ArrowIcon = styled(({ isItVisible, ...props }) => (
  <IoIosArrowForward {...props} />
))<{ isItVisible: boolean; props: unknown }>`
  margin-right: 10px;
  transform: ${({ isItVisible }) => {
    return isItVisible ? css`rotate(90deg)` : css`rotate(0deg)`;
  }};
`;

export const CheckBox = styled.input`
  margin-right: 10px;
`;

export const ApplyButton = styled.button<IBtnProps>`
  margin-top: -5px;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  box-shadow: 0 8px 25px rgb(48 48 48 / 20%);
  padding: 4px 21px;
  color: #5285cc;
  border: 1px solid currentColor;
  position: absolute;
  right: 5px;
  top: ${({ btnVerticalOffset }) => {
    return css`
      ${btnVerticalOffset}px
    `;
  }};

  display: ${({ shouldShow }) => {
    return shouldShow ? 'block' : 'none';
  }};
`;
