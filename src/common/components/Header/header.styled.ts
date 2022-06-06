import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Header = styled.header`
  height: 80px;
  align-items: center;
  padding: 10px 20px;
  display: flex;
  background-color: #303030;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: 200px 200px 1fr 50px 180px;
  justify-items: center;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.01);
    letter-spacing: 2px;
  }

  @media (max-width: 700px) {
    justify-self: start;
  }
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  grid-column-start: 5;
  text-transform: uppercase;
  font-size: 14px;
`;
