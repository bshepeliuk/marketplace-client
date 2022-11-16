import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
`;

export const TextArea = styled.textarea`
  height: 90px;
  resize: none;
  padding-bottom: 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #f5f5f5;

  &::placeholder {
    color: #bdc3c7;
    font-family: 'Roboto';
    font-weight: 400;
  }

  &:focus {
    outline: 1px solid #1abc9c;
    border: 1px solid #1abc9c;
  }
`;

export const InnerWrap = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: end;
`;

export const SendButton = styled.button`
  width: 70px;
  height: 35px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(130, 204, 221, 1);
  }

  &:disabled {
    color: #3498db;
    background-color: rgba(189, 195, 199, 0.5);
  }
`;

export const CancelButton = styled.button`
  width: 70px;
  height: 35px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
`;
