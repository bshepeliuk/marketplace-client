import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

export const List = styled.ul`
  margin-top: 50px;
  height: 400px;
  overflow-y: auto;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr) 50px;
  grid-auto-rows: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid rgba(189, 195, 199, 1);

  &:nth-child(n + 1) {
    border-top: none;
  }
`;

export const Title = styled.h5`
  margin: 0;
  border-right: 1px solid rgba(189, 195, 199, 1);
  border-top: none;
`;

export const Description = styled.p`
  margin: 0;
  border-right: 1px solid rgba(189, 195, 199, 1);
  border-top: none;
`;

export const HeaderItem = styled.div`
  width: 100%;
  border-right: 1px solid rgba(189, 195, 199, 1);

  &:last-child {
    border-right: none;
  }
`;

export const DeleteIcon = styled(MdDelete)`
  align-self: center;
  justify-self: center;

  &:hover {
    color: #e74c3c;
  }
`;

export const HeaderListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr) 50px;
  grid-auto-rows: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid rgba(189, 195, 199, 1);
`;
