import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';

interface IProps {
  onOpen: () => void;
  size: number;
  color: string;
}

const BurgerIcon = styled(GiHamburgerMenu)<Pick<IProps, 'size' | 'color'>>`
  display: none;
  grid-column: 5;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 960px) {
    display: block;
    grid-column: 5;
  }
`;

function BurgerButton({ onOpen, size, color }: IProps) {
  return <BurgerIcon onClick={onOpen} size={size} color={color} />;
}

export default BurgerButton;