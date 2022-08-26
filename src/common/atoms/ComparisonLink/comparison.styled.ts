import { FaBalanceScale } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  grid-column-start: 4;
  grid-row-start: 1;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const Icon = styled(FaBalanceScale)`
  font-size: 25px;
  color: #fff;
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
  top: -10px;
  right: -12px;
`;

export const CounterText = styled.p`
  margin: 0;
  animation: 0.3s ${count} ease-in-out both;
`;
