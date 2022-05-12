import React from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { hideByHeight, showByHeight } from './filterAnimation.styled';
import { InfoStatus, InfoStatusUnion } from '../types';

export const Wrap = styled.div<{
  infoStatus: InfoStatusUnion | null;
  height: number | null;
}>`
  padding: 20px 50px 20px 0;
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  padding: ${({ infoStatus }) => {
    const isVisible = infoStatus === InfoStatus.show || infoStatus === null;
    return isVisible ? '20px 50px 20px 0' : '0 50px 0 0';
  }};

  height: ${({ infoStatus }) => {
    const isVisible = infoStatus === InfoStatus.show || infoStatus === null;
    return isVisible ? '121px' : '0px';
  }};

  animation: ${({ height, infoStatus }) => {
    if (infoStatus === InfoStatus.show) {
      return css`0.3s ${showByHeight(height)} ease-in-out backwards`;
    }

    if (infoStatus === InfoStatus.hide) {
      return css`0.3s ${hideByHeight(height)} ease-in-out backwards`;
    }
  }};
`;

export const SideBar = styled.div`
  border: 1px solid rgba(189, 195, 199, 0.4);
  padding: 20px 15px;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  border-radius: 5px;
  grid-column: 1 / 2;
  grid-row-start: 1;

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
    return isItVisible ? 'rotate(90deg)' : 'rotate(0deg)';
  }};
  transition: all 0.3s ease-in-out;
`;

export const CheckBox = styled.input`
  margin-right: 10px;
`;

export const ApplyButton = styled.button`
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  box-shadow: 0 8px 25px rgb(48 48 48 / 20%);
  padding: 4px 10px;
  color: #5285cc;
  border: 1px solid currentColor;
`;

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 120px;
  margin-right: 10px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #bdc3c7;
  padding: 0 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;
