import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 18px;
  grid-column-start: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #2c3e50;
  margin-left: 5px;

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

export const Price = styled.p`
  margin: 0;
  grid-column-start: 4;
  color: #3498db;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 5px;

  @media (max-width: 600px) {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const Image = styled.img`
  max-width: 70px;
  grid-column-start: 1;
  justify-self: center;

  @media (max-width: 600px) {
    grid-row: 1 / 3;
  }
`;

export const IncrementBtn = styled.button`
  background-color: #34495e;
  border: none;
  color: #fff;
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

export const DecrementBtn = styled.button`
  background-color: #34495e;
  border: none;
  color: #fff;
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

export const Counter = styled.span`
  padding: 0 10px;
`;

export const DeleteIcon = styled(MdDelete)`
  font-size: 20px;
  color: #7f8c8d;

  &:hover {
    color: #e00027;
  }

  @media (max-width: 600px) {
    grid-row: 1 / 3;
    align-self: center;
    grid-column: 4;
  }
`;

export const CounterWrap = styled.div`
  grid-column-start: 3;
  justify-self: center;

  @media (max-width: 600px) {
    grid-row: 1 / 3;
  }
`;

export const DeviceLink = styled(Link)`
  text-decoration: none;
  grid-column-start: 2;
`;
