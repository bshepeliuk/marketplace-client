import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 10px;
`;

export const InnerWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'LABEL ERROR'
    'INPUT INPUT';
`;

export const ErrorWrapper = styled.span`
  grid-area: ERROR;
  color: #e74c3c;
  justify-self: end;
`;

export const Label = styled.label`
  color: rgba(149, 165, 166, 1);
  padding-bottom: 5px;
  grid-area: LABEL;
`;

export const Input = styled.input`
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  height: 30px;
  padding: 5px 10px;
  grid-area: INPUT;
`;
