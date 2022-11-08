import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

interface IWrapProps {
  height: number;
}

export const Wrap = styled.div<IWrapProps>`
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  height: ${({ height }) => {
    return `${height}px`;
  }};

  padding: ${({ height }) => {
    return height > 0 ? '20px 50px 20px 0' : '0 50px 0 0';
  }};
`;

export const SideBar = styled.div`
  padding: 20px 15px;
  position: relative;
  border-radius: 5px;
  height: max-content;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(236, 240, 241, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }

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
  margin-bottom: 6px;
  user-select: none;

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 13px;
  }
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ArrowIcon = styled(({ isItVisible, ...props }) => <IoIosArrowForward {...props} />)<{
  isItVisible: boolean;
  props: unknown;
}>`
  margin-right: 10px;
  transform: ${({ isItVisible }) => {
    return isItVisible ? 'rotate(90deg)' : 'rotate(0deg)';
  }};
  transition: all 0.3s ease-in-out;
`;

export const CheckBox = styled.input`
  margin-right: 10px;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  border-radius: 3px;

  & input:checked ~ .checkmark:after {
    display: block;
  }

  &:hover input ~ .checkmark {
    background-color: rgba(189, 195, 199, 0.2);
  }

  & input:checked ~ .checkmark {
    background-color: #fff;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid rgba(189, 195, 199, 0.7);

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 5px;
      top: 1px;
      width: 4px;
      height: 8px;
      border: solid #7f8c8d;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
`;

export const ApplyButton = styled.button`
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  box-shadow: 0 8px 25px rgb(48 48 48 / 20%);
  padding: 4px 10px;
  color: #5285cc;
  border: 1px solid currentColor;
  cursor: pointer;

  &:disabled {
    border: 1px solid #bdc3c7;
    color: #bdc3c7;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  width: 100%;
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

export const Title = styled.div`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: 'Roboto';
`;

export const Description = styled.li`
  font-family: 'Roboto';
  font-weight: 300;
`;
