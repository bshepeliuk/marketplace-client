import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 50px);
  justify-content: center;
`;

export const Role = styled.p`
  color: #3498db;
  margin-bottom: 0;
  border: 1px solid #3498db;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0;
  height: 30px;
  text-align: center;
`;

export const UserWrap = styled.div`
  display: grid;
  grid-template-columns: 300px 100px;
  column-gap: 10px;
  align-items: center;
`;

export const FullName = styled.h1`
  color: #34495e;
  font-size: 30px;
  text-transform: uppercase;
`;
