import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdExitToApp } from 'react-icons/md';

export const UserWrap = styled.div`
  grid-column-start: 6;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const show = keyframes`
  0% {
    width: 0;
    padding: 0;
    opacity: 0;
    height: 0;
  }

  100% {
    opacity: 1;
    height: 106px;
    width: 200px;
  }
`;

export const InfoWrap = styled.div`
  z-index: 5;
  position: absolute;
  top: 70px;
  border-radius: 4px;
  padding: 15px;
  min-width: 200px;
  height: max-content;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: -10px 0px 20px -7px rgb(189 195 199 / 50%), 10px 0px 20px -7px rgb(189 195 199 / 50%),
    5px 5px 9px -8px rgb(189 195 199 / 80%);
  border: 1px solid rgba(236, 240, 241, 1);
  overflow: hidden;
  animation: 0.2s ${show} ease-in backwards;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ArrowIcon = styled(({ isOpen, ...props }) => <TiArrowSortedDown {...props} />)`
  color: #fff;
  margin-left: 7px;
  font-size: 19px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  transform: ${({ isOpen }) => {
    return isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  }};

  &:hover {
    background-color: #565656;
    border-radius: 3px;
  }
`;

export const AccountLink = styled(Link)`
  color: #34495e;
  font-size: 15px;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
`;

export const Email = styled.p`
  margin: 0;
  color: #95a5a6;
`;

export const Role = styled.p`
  color: rgba(26, 188, 156, 1);
  margin: 0;
`;

export const Logout = styled(MdExitToApp)`
  font-size: 20px;
  align-self: flex-start;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    color: rgba(10, 61, 98, 1);
  }
`;

export const InnerWrapper = styled.div`
  padding: 15px 0;
  display: flex;
  flex-flow: column wrap;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: #005a8d;
  transition: all 0.2s ease-out;

  &:hover {
    text-decoration: underline;
    color: #92b4ec;
  }
`;
