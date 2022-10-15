import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  gap: 15px;
`;

export const MonthButton = styled.button<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 3px;
  transition: all 0.5s ease-out;
  color: #16a596;
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border: ${(props) => (props.isSelected ? '1px solid #66BFBF' : '1px solid #e8f9fd')};

  &:hover {
    box-shadow: rgb(26 188 156 / 22%) 0px 1px 3px 0px, rgb(26 188 156 / 12%) 0px 1px 2px 0px;
  }
`;
