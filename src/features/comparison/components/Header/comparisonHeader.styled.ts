import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderList = styled.ul<{ columns: number }>`
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

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const HeaderListItem = styled.li`
  display: grid;
  grid-template-rows: 200px 1fr 1fr;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  background-color: #fff;
  padding: 15px;
  row-gap: 8px;
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  align-self: center;
  justify-self: center;
  grid-column: 1 / -1;
  grid-row: 1;
  user-select: none;
`;

export const DeleteIcon = styled(AiFillCloseCircle)`
  color: rgb(52, 73, 94);
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 25px;
  color: rgba(52, 73, 94, 1);
  cursor: pointer;
`;

export const HeaderInfoItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  color: #303030;
`;

export const Price = styled.p`
  color: #e00027;
  margin: 0;
  justify-self: start;
  align-self: center;
  font-size: 18px;
`;

export const DeviceLink = styled(Link)`
  grid-column: 1 / -1;
  grid-row: 2;
  justify-self: start;
  align-self: center;
  font-size: 17px;
  text-decoration: none;
  font-weight: 400;
  line-height: 18px;
  color: #303030;

  &:hover {
    color: #5285cc;
  }
`;

export const PayButton = styled.button`
  background-color: #e31837;
  border: none;
  border-radius: 4px;
  height: 36px;
  width: 52px;
  color: #fff;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  grid-row: 3;
  grid-column: 2;
  justify-self: end;
`;
