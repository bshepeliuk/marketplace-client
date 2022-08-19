import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from '@src/app/Router';
import useSearchContext from '../../hooks/useSearchContext';
import {
  FoundListItem,
  List,
  StyledHighlighter,
} from '../../styles/searchBar.styled';

function SuggestionList() {
  const context = useSearchContext();
  const navigate = useNavigate();

  const onItemClick = (deviceId: number) => {
    navigate(generatePath(routes.device, { deviceId: String(deviceId) }));
    context.onClear();
  };

  return (
    <List className="custom-scrollbar">
      {context.suggestions.map((item) => {
        return (
          <FoundListItem key={item.id} onClick={() => onItemClick(item.id)}>
            <StyledHighlighter
              searchWords={[context.searchValue]}
              textToHighlight={item.name}
            />
          </FoundListItem>
        );
      })}
    </List>
  );
}

export default SuggestionList;
