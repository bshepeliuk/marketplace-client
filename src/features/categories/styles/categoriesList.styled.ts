import styled from 'styled-components';

export const Wrap = styled.div`
  height: 50px;
`;

export const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0 10px;
  align-items: center;
  margin: 0;
  height: 100%;
`;

export const ListItem = styled.li`
  margin-right: 10px;
`;

export const CategoryButton = styled.button`
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
  color: #303030;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 7px 15px;

  &:hover {
    color: #e31837;
    box-shadow: 0 0 5px rgb(0 0 5 / 20%);
  }
`;
