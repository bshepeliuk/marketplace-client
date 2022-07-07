import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import useSearchContext from '../../hooks/useSearchContext';

const Button = styled.button`
  background-color: #e00027;
  border: none;
  width: 52px;
  border-radius: 0 4px 4px 0;
  font-size: 20px;
  color: #fff;
`;

function SearchButton() {
  const context = useSearchContext();

  return (
    <Button type="button" onClick={context.onSearch}>
      <FiSearch />
    </Button>
  );
}

export default SearchButton;
