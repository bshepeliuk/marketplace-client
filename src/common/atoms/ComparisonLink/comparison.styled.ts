import { FaBalanceScale } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  grid-column-start: 4;
  grid-row-start: 1;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const Icon = styled(FaBalanceScale)`
  font-size: 25px;
  color: #fff;
`;

export const CustomLink = styled(Link)`
  display: flex;
  padding: 10px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #565656;
    border-radius: 3px;
  }
`;

const count = keyframes`
  0% {
    opacity: 0;
    margin-top: 10px;
  };

  100%{
    margin-top: 0;
    opacity: 1;
  };
`;

export const Counter = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 3px;
  min-width: 20px;
  max-width: 44px;
  height: 20px;
  background-color: #e31837;
  border-radius: 10px;
  color: #fff;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -6px;
`;

export const CounterText = styled.p`
  margin: 0;
  animation: 0.3s ${count} ease-in-out both;
`;
