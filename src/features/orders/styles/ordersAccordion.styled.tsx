import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 10px;
  min-width: 100%;

  @media (max-width: 1330px) {
    width: fit-content;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 20px 6px 20px;
  overflow-x: auto;
`;

export const Cell = styled.div`
  padding: 10px;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 7%) 0px 4px 12px;
`;

export const BodyHeaderCell = styled(Cell)`
  background-color: #f9f9f9;
  color: #487eb0;
  text-transform: uppercase;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

export const Body = styled.div<{ isOpen: boolean; height: number | undefined }>`
  grid-column: 1 / -1;
  background-color: #ecf0f1;
  display: grid;
  gap: 1px;
  border: 1px solid #ecf0f1;
  transition: height 0.2s ease-in-out;
  overflow: hidden;
  height: ${(props) => {
    if (props.height === undefined) return 'auto';
    return `${props.height}px`;
  }};
  margin-bottom: ${(props) => (props.isOpen ? '10px' : '0px')};
  border-top: ${(props) => (props.isOpen ? '1px solid #ecf0f1' : 'none')};
  border-bottom: ${(props) => (props.isOpen ? '1px solid #ecf0f1' : 'none')};
`;

export const Row = styled.div`
  gap: 1px;
  display: grid;
  grid-template-columns: repeat(7, minmax(182px, 1fr));
`;

export const Price = styled.div`
  font-weight: bold;
  color: #435560;
`;

export const DeviceLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  transition: all 0.4s ease-out;

  &:hover {
    text-decoration: underline;
  }
`;

export const UpdatedAtWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  color: #87a7b3;
`;

export const DateWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export const HeaderWrapper = styled.div`
  position: relative;
`;

export const HeaderCell = styled.div`
  padding: 20px 0 10px 0;
  width: 100%;
  height: 100%;
  background-color: #f0f8ff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6d8299;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, minmax(190px, 1fr));
  align-items: center;
  justify-items: center;
  border-radius: 4px;
  gap: 1px;
  position: absolute;
  width: 100%;
  top: -7px;
  border-left: 1px solid #8395a7;
  border-right: 1px solid #8395a7;
`;

export const HeaderItem = styled.div`
  background-color: #8395a7;
  padding: 2px 4px;
  color: #fff;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1px;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const OrdersAccordionHeader = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, minmax(190px, 1fr));
  align-items: center;
  justify-items: start;
  border-radius: 4px;
  margin-bottom: 5px;
  box-shadow: rgb(99 99 99 / 7%) 0px 2px 8px 0px;
  background-color: #d2dae2;
  color: #34495e;
  gap: 1px;
  border: 1px solid #d2dae2;
`;

export const ToggleButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7c99ac;
  color: #fff;
  border-radius: 3px;
  border: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ArrowIcon = styled(({ isOpen, ...props }) => <IoIosArrowForward {...props} />)<{
  isOpen: boolean;
  props: unknown;
}>`
  transform: ${({ isOpen }) => {
    return isOpen ? 'rotate(-90deg)' : 'rotate(90deg)';
  }};
  transition: all 0.3s ease-in-out;
`;
