import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RegisterWrapper = styled.div`
  grid-column: 2 / 3;
  align-self: center;
`;

export const RegistrationForm = styled.form`
  display: flex;
  max-width: 350px;
  flex-flow: column wrap;
`;

export const RegisterButton = styled.button`
  height: 35px;
  margin: 20px 0 10px 0;
  background-color: #1abc9c;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: rgba(127, 140, 141, 0.1);
    color: #1abc9c;
  }
`;

export const RegisterFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: #3498db;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
