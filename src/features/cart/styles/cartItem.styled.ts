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
`;

export const Price = styled.p`
  margin: 0;
  grid-column-start: 4;
  color: #3498db;
`;

export const Image = styled.img`
  max-width: 70px;
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
`;

export const CounterWrap = styled.div`
  grid-column-start: 3;
  justify-self: center;
`;

export const DeviceLink = styled(Link)`
  text-decoration: none;
  grid-column-start: 2;
`;
