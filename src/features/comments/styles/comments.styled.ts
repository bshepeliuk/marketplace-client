import styled from 'styled-components';
import { VariableSizeList } from 'react-window';

export const StyledList = styled(VariableSizeList)``;

export const LoadMoreWrap = styled.div`
  width: 310px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;

  @media (max-width: 500px) {
    width: 230px;
  }

  @media (max-width: 400px) {
    width: 200px;
  }
`;

export const RowContainer = styled.div`
  padding-left: 20px;

  @media (max-width: 500px) {
    padding-left: 0;
  }
`;

export const ReplyList = styled.ul`
  margin-left: 50px;

  @media (max-width: 500px) {
    margin-left: 10px;
  }
`;

export const Row = styled.div`
  position: relative;
`;

export const ShowRepliesButton = styled.button`
  white-space: nowrap;
  width: max-content;
  border: none;
  background-color: rgba(149, 165, 166, 0.22);
  border-radius: 50px;
  padding: 2px 16px;
  color: rgba(52, 73, 94, 1);
  display: flex;
  cursor: pointer;
`;

export const FormWrapper = styled.div`
  grid-column: 2 / -1;
  padding: 5px 0;
`;

export const LogoWrap = styled.div`
  grid-area: LOGO;
  justify-self: center;
`;

export const Comment = styled.li`
  display: grid;
  grid-template-areas:
    'LOGO FULL-NAME CREATED-AT'
    'LOGO BODY BODY'
    'LOGO BTN BTN';
  grid-template-columns: 60px 200px 150px;
  height: 100%;
  padding-bottom: 20px;

  @media (max-width: 570px) {
    grid-template-columns: 60px 150px 100px;
  }

  @media (max-width: 450px) {
    grid-template-columns: 60px 140px 70px;
  }
`;

export const BtnWrap = styled.div`
  grid-area: BTN;
  justify-self: end;
  height: 20px;
`;

export const FullName = styled.h1`
  grid-area: FULL-NAME;
  margin: 0;
  font-size: 18px;
  justify-self: start;
  color: #34495e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: start;
`;

export const Body = styled.p`
  grid-area: BODY;
  margin: 0;
  justify-self: start;
  white-space: pre-wrap;
  text-align: left;
  padding: 10px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;

export const CreatedAt = styled.div`
  grid-area: CREATED-AT;
  justify-self: end;
  color: #7f8c8d;

  @media (max-width: 550px) {
    font-size: 12px;
  }
`;

const CommentBaseButton = styled.button`
  width: max-content;
  border: none;
  background-color: transparent;
  color: #2c3e50;
  padding: 0;
  padding-left: 15px;

  &::after {
    content: '';
    width: 100%;
    transform: scaleX(1);
    height: 1px;
    display: block;
    background-color: #2c3e50;
    transform-origin: center;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(0);
    transform-origin: center;
  }
`;

export const EditButton = styled(CommentBaseButton)``;
export const ReplyButton = styled(CommentBaseButton)``;
export const DeleteButton = styled(CommentBaseButton)``;

export const ShowMoreButton = styled.button`
  cursor: pointer;
  background-color: #95afc0;
  border: none;
  border-radius: 50px;
  color: #fff;
  padding: 5px 10px;
`;

export const ScrollTopButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  background-color: #34495e;
  color: #fff;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
`;
