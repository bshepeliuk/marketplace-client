import React from 'react';
import useSearchContext from '../../hooks/useSearchContext';
import { Input } from '../../styles/searchBar.styled';

function SearchInput() {
  const context = useSearchContext();

  return (
    <Input
      type="text"
      className="search-input"
      placeholder="Search devices here..."
      onChange={context.onChange}
      onKeyPress={context.onEnterPress}
      value={context.searchValue}
    />
  );
}

export default SearchInput;
