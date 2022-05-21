import styled from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  position: absolute;
  z-index: 2;
  width: 200px;
  background-color: #fff;
  margin: 0;
  top: 61px;
  box-shadow: 3px 2px 38px 5px rgb(0 0 0 / 18%);
  border: 1px solid rgba(236, 240, 241, 1);
`;

export const Wrap = styled.div`
  position: relative;
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
`;

export const ListItem = styled.li<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? 'rgba(189, 195, 199, 0.2)' : ''};
  padding: 10px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(189, 195, 199, 0.2);
  }

  a {
    text-decoration: none;
    color: #34495e;

    &:active {
      color: currentColor;
    }
  }
`;
