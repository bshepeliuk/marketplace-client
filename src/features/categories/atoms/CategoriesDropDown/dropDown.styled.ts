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
  padding: 6px 0;
  border-radius: 0 0 4px 4px;
`;

export const Wrap = styled.div`
  position: relative;

  @media (max-width: 1000px) {
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
  color: #34495e;
  border-radius: 4px;
  display: block;
  color: #303030;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0.15px;
  transition: all 0.2s ease-out;
  padding: 8px 12px;

  &:hover {
    font-weight: 600;
  }

  &.active-category {
    font-weight: 400;
  }
`;

export const ListItem = styled.li`
  text-decoration: none;
  color: #fff;
  color: #34495e;
  color: #303030;
  font-size: 15px;
  letter-spacing: 0.15px;
  font-family: 'Roboto';
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #fff;
    box-shadow: 4px 1px 7px -2px #c5c5c5, 0 2px 7px -2px #c5c5c5;
  }

  &.active-category {
    background-color: #fff;
    box-shadow: 4px 1px 7px -2px #c5c5c5, 0 2px 7px -2px #c5c5c5;
  }
`;
