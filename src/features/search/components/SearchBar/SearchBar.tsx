import React from 'react';
import SearchProvider from '../../context/SearchContext';
import { SearchWrapper, Wrap } from '../../styles/searchBar.styled';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import DeleteButton from './DeleteButton';
import SuggestionsView from './SuggestionsView';

function SearchBarView() {
  return (
    <SearchProvider>
      <Wrap>
        <SearchWrapper>
          <SearchInput />
          <SearchButton />
          <DeleteButton />
        </SearchWrapper>

        <SuggestionsView />
      </Wrap>
    </SearchProvider>
  );
}

export default SearchBarView;
