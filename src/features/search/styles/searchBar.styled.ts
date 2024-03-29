import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 4px 0 0 4px;
  border: none;
  padding: 10px;
  outline: none;
`;

export const List = styled.ul`
  background-color: #fff;
  border: 1px solid rgba(209, 216, 224, 0.6);
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 50px;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  padding-bottom: 0;
`;

export const DefaultListItem = styled.li`
  font-size: 14px;
  padding: 10px 12px;
  cursor: pointer;
`;

export const SuggestionListItem = styled(DefaultListItem)`
  transition: all 0.3s ease-out;

  &:hover {
    background-color: rgba(200, 214, 229, 0.6);
    color: #4b6584;
  }
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 10px;
  position: fixed;
  top: 80px;
  height: calc(100vh - 80px); // header height 80px;
  z-index: 5;
  left: 0;
`;

export const StyledHighlighter = styled(Highlighter)`
  & mark {
    padding: 2px 0;
    border-radius: 4px;
  }
`;
