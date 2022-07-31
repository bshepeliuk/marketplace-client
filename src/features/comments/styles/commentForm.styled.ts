import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
`;

export const TextArea = styled.textarea`
  height: 90px;
  resize: none;
  padding-bottom: 0;
  padding: 10px;
  border-radius: 4px;

  &:focus {
    outline: 1px solid #1abc9c;
    border: 1px solid #1abc9c;
  }
`;

export const InnerWrap = styled.div`
  display: flex;
  justify-content: end;
`;

export const SendButton = styled.button`
  width: 150px;
  height: 40px;
`;

export const CancelButton = styled.button``;
