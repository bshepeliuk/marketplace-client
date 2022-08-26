import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

export const Wrap = styled.div`
  grid-column-start: 5;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const Icon = styled(FaPlus)`
  color: #fff;
`;
