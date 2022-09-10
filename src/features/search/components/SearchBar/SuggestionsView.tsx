import React from 'react';
import useSearchContext from '../../hooks/useSearchContext';
import { DefaultListItem, List, Overlay } from '../../styles/searchBar.styled';
import SuggestionList from './SuggestionList';

function SuggestionsView() {
  const context = useSearchContext();

  if (!context.isVisible) return null;

  if (context.isEmpty) {
    return (
      <>
        <EmptyList />
        <Overlay onClick={context.onClear} />
      </>
    );
  }

  if (context.isLoading)
    return (
      <>
        <LoaderList />
        <Overlay onClick={context.onClear} />
      </>
    );

  return (
    <>
      <SuggestionList />
      <Overlay onClick={context.onClear} />
    </>
  );
}

function LoaderList() {
  return (
    <List>
      <DefaultListItem>Loading...</DefaultListItem>
    </List>
  );
}

function EmptyList() {
  return (
    <List>
      <DefaultListItem>Unfortunately we don't have devices with such name.</DefaultListItem>
    </List>
  );
}

export default SuggestionsView;
