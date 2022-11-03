import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  align-items: center;
  background-color: #303030;
  display: grid;
  grid-template-columns: 200px 200px 1fr 50px 50px 180px;
  grid-column-gap: 20px;
  justify-items: center;

  @media screen and (min-width: 1600px) {
    width: 100%;
    max-width: 1600px;
  }

  @media screen and (max-width: 1600px) {
    width: 100%;
    max-width: 1440px;
  }

  @media screen and (max-width: 1300px) {
    grid-template-columns: 150px auto 1fr 50px 50px auto;
  }

  @media (max-width: 740px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Header = styled.header`
  height: 80px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #303030;
`;

export const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;

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
  grid-column-start: 6;
  text-transform: uppercase;
  font-size: 14px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const SearchWrap = styled.div`
  max-width: 800px;
  width: 100%;

  @media (max-width: 1000px) {
    display: none;
  }
`;
