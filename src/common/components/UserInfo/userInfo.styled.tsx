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

  @media (max-width: 960px) {
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
  padding: 10px;
  width: 200px;
  height: 106px;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: -10px 0px 20px -7px rgb(189 195 199 / 50%),
    10px 0px 20px -7px rgb(189 195 199 / 50%),
    5px 5px 9px -8px rgb(189 195 199 / 80%);
  border: 1px solid rgba(236, 240, 241, 1);
  overflow: hidden;
  animation: 0.2s ${show} ease-in backwards;
`;

export const ArrowIcon = styled(({ isOpen, ...props }) => (
  <TiArrowSortedDown {...props} />
))`
  color: #fff;
  margin-left: 10px;
  transform: ${({ isOpen }) => {
    return isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  }};

  transition: all 0.3s ease-in-out;
`;

export const AccountLink = styled(Link)`
  color: #34495e;
  font-size: 15px;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Email = styled.p`
  margin: 0;
  color: #95a5a6;
`;

export const Role = styled.p`
  color: rgba(26, 188, 156, 1);
  margin-bottom: 0;
`;

export const Logout = styled(MdExitToApp)`
  font-size: 20px;
  align-self: flex-start;
  margin-top: 10px;
`;
