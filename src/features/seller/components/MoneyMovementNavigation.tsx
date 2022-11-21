import { routes } from '@src/app/Router';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function MoneyMovementNavigation() {
  return (
    <List>
      <li>
        <CustomLink end to={routes.moneyMovement}>
          Charges
        </CustomLink>
      </li>
      <li>
        <CustomLink to={routes.payouts}>Payouts</CustomLink>
      </li>
      <li>
        <CustomLink to={routes.transfers}>Transfers</CustomLink>
      </li>
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 35px;
  padding-top: 20px;
`;

const CustomLink = styled(NavLink)`
  font-size: 1rem;
  text-decoration: none;
  color: rgba(84, 89, 105, 1);
  font-weight: bold;
  position: relative;

  &:hover {
    color: rgba(84, 89, 105, 1);
  }

  &.active {
    color: rgb(98, 90, 250);
  }

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    display: block;
    background-color: rgb(98, 90, 250);
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
    margin-top: 10px;
  }

  &.active::after {
    transition-delay: 0.25s;
    transform: scaleX(1);
  }
`;

export default MoneyMovementNavigation;
