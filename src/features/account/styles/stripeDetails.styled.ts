import styled from 'styled-components';

export const StripeWrap = styled.div`
  display: grid;
  grid-template-columns: 300px 100px 100px;
  column-gap: 10px;
  align-items: center;
`;

export const Title = styled.h2`
  color: #7f8c8d;
  text-transform: lowercase;
  font-size: 30px;
  margin: 0;
`;

export const Enabled = styled.div`
  border: 1px solid #1abc9c;
  border-radius: 4px;
  padding: 5px 10px;
  color: #1abc9c;
  text-transform: uppercase;
  font-size: 12px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Disabled = styled.div`
  border: 1px solid #e74c3c;
  border-radius: 4px;
  padding: 5px 10px;
  color: #e74c3c;
  text-transform: uppercase;
  font-size: 12px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActivateButton = styled.button`
  height: 30px;
  border: none;
  background-color: #1abc9c;
  color: #fff;
  text-transform: uppercase;
  border-radius: 4px;

  &:disabled {
    background-color: #bdc3c7;
  }
`;
