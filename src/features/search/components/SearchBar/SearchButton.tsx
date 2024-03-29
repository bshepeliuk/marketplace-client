import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import useSearchContext from '../../hooks/useSearchContext';

function SearchButton() {
  const context = useSearchContext();

  return (
    <Button className="search-button" type="button" onClick={context.onSearch}>
      <FiSearch />
    </Button>
  );
}

const Button = styled.button`
  background-color: #e00027;
  border: none;
  width: 52px;
  border-radius: 0 4px 4px 0;
  font-size: 20px;
  color: #fff;
  transition: background-color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    background-color: #f97988;
  }
`;

export default SearchButton;
