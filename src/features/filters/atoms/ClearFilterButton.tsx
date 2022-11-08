import React from 'react';
import styled from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import useFilterContext from '../hooks/useFilterContext';

const ClearButton = styled.button`
  padding: 4px 10px;
  border-radius: 4px 0 0 4px;
  border: 1px solid red;
  background-color: #fff;
  cursor: pointer;
`;

function ClearFilterButton() {
  const context = useFilterContext();

  const { clearSelectedOptions } = context;

  return (
    <ClearButton type="button" onClick={clearSelectedOptions}>
      <MdDeleteOutline size="12" color="#e74c3c" />
    </ClearButton>
  );
}

export default ClearFilterButton;
