import styled from 'styled-components';

export const Wrap = styled.div`
  height: 50px;
  margin-top: -60px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const List = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  list-style-type: none;
  padding: 0 10px;
  align-items: center;
  margin: 0;
  height: 100%;
  overflow: hidden;
`;

export const ListItem = styled.li`
  margin-right: 10px;
`;

export const CategoryButton = styled.button<{ isActive: boolean }>`
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
  color: #303030;
  background: #fff;
  border-radius: 4px;
  padding: 7px 15px;

  border: ${({ isActive }) => {
    return isActive ? '1px solid #e31837' : '1px solid #e0e0e0';
  }};

  color: ${({ isActive }) => {
    return isActive ? '#e31837' : '#303030';
  }};

  &:hover {
    color: #e31837;
    box-shadow: 0 0 5px rgb(0 0 5 / 20%);
  }
`;
