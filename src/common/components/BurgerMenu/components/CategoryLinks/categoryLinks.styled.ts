import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const CategoryList = styled.ul`
  display: flex;
  row-gap: 10px;
  flex-flow: column wrap;
`;

export const CategoryLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;

  &:hover {
    color: #70a1ff;
  }

  & .active-category {
    color: #70a1ff;
  }
`;
