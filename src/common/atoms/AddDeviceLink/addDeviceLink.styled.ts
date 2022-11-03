import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrap = styled.div`
  grid-column-start: 5;

  @media (max-width: 1000px) {
    display: none;
  }
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

export const Icon = styled(FaPlus)`
  color: #fff;
`;
