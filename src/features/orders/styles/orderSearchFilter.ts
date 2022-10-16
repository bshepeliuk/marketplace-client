import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  height: 38px;
`;

export const SearchInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 0 4px 4px 0;
  padding: 4px 8px;
  border-left: 1px solid transparent;

  &:focus {
    outline: none;
    border: 1px solid #2684ff;
  }
`;
