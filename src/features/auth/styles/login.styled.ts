import styled from 'styled-components';

export const LoginWrapper = styled.div`
  grid-column: 2 / 3;
  align-self: center;
`;

export const LoginForm = styled.form`
  display: flex;
  max-width: 350px;
  flex-flow: column wrap;
`;

export const LoginButton = styled.button`
  height: 35px;
  margin: 20px 0 10px 0;
  background-color: #1abc9c;
  border: none;
  border-radius: 4px;
  color: #fff;

  &:disabled {
    background-color: rgba(127, 140, 141, 0.1);
    color: #1abc9c;
  }
`;
