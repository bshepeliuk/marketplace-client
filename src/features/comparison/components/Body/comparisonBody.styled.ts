import styled from 'styled-components';

export const BodyListItem = styled.li`
  background-color: #f5f6fa;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #34495e;
`;

export const BodyHeaderItem = styled.li`
  background-color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  &:hover {
    cursor: move;
  }
`;

export const BodyList = styled.ul<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 250px)`;
  }};

  width: max-content;
  position: relative;
  z-index: 1;
  border: 1px solid #c8d6e5;
  background-color: #c8d6e5;
  grid-gap: 1px;
  margin-bottom: -1px;

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    border: 1px solid #3498db;
    z-index: 2;
    background-color: aliceblue;
  }

  &:hover:after {
    content: '';
    width: 6px;
    background-color: #3498db;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  &:hover li {
    z-index: 2;
    color: #3498db;
    background-color: transparent;
  }
`;
