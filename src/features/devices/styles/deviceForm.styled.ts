import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FormWrap = styled.div`
  width: 400px;
`;

export const FormFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const NextLink = styled(Link)`
  grid-column: 2;
  justify-self: end;
  user-select: none;
`;

export const NextButton = styled.button`
  grid-column: 2;
  justify-self: end;
  user-select: none;
`;

export const PrevLink = styled(Link)`
  grid-column: 1;
  justify-self: start;
  user-select: none;
`;

export const SaveButton = styled.button`
  grid-column: 2;
  justify-self: end;
`;

export const PreviewImage = styled.img`
  height: 200px;
`;

export const PreviewList = styled.ul`
  padding: 20px 15px;
  margin: 0;
  display: flex;
  overflow-x: auto;
`;

export const PreviewListItem = styled.li`
  border: 1px solid rgba(149, 165, 166, 0.3);
  border-radius: 4px;
  padding: 2px 6px;
  margin-right: 15px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  &:last-child {
    margin-right: 0px;
  }
`;
