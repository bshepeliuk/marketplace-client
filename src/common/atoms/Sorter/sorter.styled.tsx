import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

export const SorterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  white-space: nowrap;
`;

export const SorterHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #f9f9f9;
  height: 100%;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  letter-spacing: 1px;
  color: #778ca3;

  &:hover {
    outline: none;
    border: 1px solid #2684ff;
  }
`;

export const SorterBody = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  z-index: 100;
  width: 100%;
  padding: 10px;

  background-color: hsl(0, 0%, 100%);
  border-radius: 4px;
  box-shadow: 0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%);
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 4px 10px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  border-radius: 2px;
  color: #16a596;
`;

export const SortOrderWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;
export const SortOrderButton = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 10px;
  padding: 4px 0;
  letter-spacing: 1px;
  transition: all 0.5s ease-out;
  border: 1px solid #1abc9c;
`;

export const AscSortButton = styled(SortOrderButton)<{ isActive: boolean }>`
  color: #fff;
  font-weight: bold;
  border-radius: 5px 0 0 5px;
  background-color: ${(props) => (props.isActive ? '#1abc9c' : '#fff')};
  color: ${(props) => (props.isActive ? '#fff' : '#1abc9c')};
`;

export const DescSortButton = styled(SortOrderButton)<{ isActive: boolean }>`
  color: #fff;
  font-weight: bold;
  border-radius: 0 5px 5px 0;
  background-color: ${(props) => (props.isActive ? '#1abc9c' : '#fff')};
  color: ${(props) => (props.isActive ? '#fff' : '#1abc9c')};
`;

export const SortListItem = styled.li`
  margin-bottom: 5px;
`;

export const SortItemButton = styled.button<{ isActive: boolean }>`
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease-out;
  color: ${(props) => (props.isActive ? '#16a596' : '#00303f')};

  &:hover {
    color: #16a596;
  }
`;

export const SortFooter = styled.div`
  margin-top: 15px;
`;

export const CancelButton = styled.button`
  width: 50%;
  cursor: pointer;
  background-color: #f1f1f1;
  border: none;
  color: #0a3d62;
  letter-spacing: 1px;
  padding: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #f4f4f2;
  }
`;
export const ApplyButton = styled.button`
  width: 50%;
  cursor: pointer;
  background-color: #82ccdd;
  letter-spacing: 1px;
  border: none;
  color: #fff;
  padding: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #3498db;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, react/react-in-jsx-scope
export const ArrowIcon = styled(({ isOpen, ...props }) => <IoIosArrowForward {...props} />)<{
  isOpen: boolean;
  props: unknown;
}>`
  font-size: 1.1em;
  transition: all 0.3s ease-in-out;
  transform: ${({ isOpen }) => {
    return isOpen ? 'rotate(-90deg)' : 'rotate(90deg)';
  }};
`;
