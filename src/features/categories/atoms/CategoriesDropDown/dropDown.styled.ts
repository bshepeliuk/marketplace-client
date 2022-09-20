import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  position: absolute;
  z-index: 10;
  width: 200px;
  background-color: #fff;
  margin: 0;
  top: 61px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 3px 2px 38px 5px rgb(0 0 0 / 18%);
  border: 1px solid rgba(236, 240, 241, 1);
  padding-bottom: 0;
`;

export const Wrap = styled.div`
  position: relative;

  @media (max-width: 960px) {
    display: none;
  }
`;

export const CategoriesButton = styled.button`
  background-color: #e00027;
  border: none;
  color: #fff;
  border-radius: 4px;
  height: 40px;
  width: 170px;
  font-size: 16px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: background-color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    background-color: #f97988;
  }
`;

export const CategoryLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  color: #34495e;
  padding: 10px;
  border-radius: 4px;
  display: block;

  &:hover {
    color: #e31837;
    background-color: rgba(189, 195, 199, 0.2);
  }

  &.active-category {
    color: #e31837;
    background-color: rgba(189, 195, 199, 0.2);
  }
`;
