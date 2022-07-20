import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MainLinksContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
`;

export const SearchContainer = styled.div`
  padding: 20px 10px;

  & .search-input {
    border-radius: 20px 0 0 20px;
  }

  & .search-button {
    border-radius: 0 20px 20px 0;
    background-color: #1abc9c;
  }
`;

export const CategoriesContainer = styled.div`
  padding: 20px;
`;

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  padding: 5px 0;
  font-size: 18px;
  display: grid;
  grid-template-columns: 30px 1fr;
  transition: transform 0.2 ease-in-out;

  &:hover {
    color: #70a1ff;
  }

  &.active svg {
    transform: scale(1.5);
  }

  &.active {
    color: #70a1ff;
  }
`;

export const MenuTitle = styled.h1`
  margin: 0;
  padding-left: 15px;
  color: #1abc9c;
  font-weight: 500;
  font-size: 30px;
`;

export const DividingLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #1abc9c;
  display: block;
`;
