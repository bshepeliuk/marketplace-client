import React, { useState } from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
}

export function MonthFilter({ onFilterChange }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<number[]>([]);

  const onMonthClick = (idx: number) => {
    if (checkIsSelected(idx)) {
      const filteredMonths = selected.filter((monthIdx) => monthIdx !== idx);
      setSelected(filteredMonths);

      searchParams.delete('month');

      for (const month of filteredMonths) {
        searchParams.append('month', String(month));
      }
    } else {
      setSelected(selected.concat(idx));
      searchParams.append('month', String(idx));
    }

    const filters = getOrderFilterParams();

    onFilterChange(filters);
    setSearchParams(searchParams);
  };

  const getOrderFilterParams = () => [...searchParams.entries()].filter(([key]) => key !== 'page');

  const checkIsSelected = (idx: number) => selected.includes(idx);

  return (
    <List>
      {months.map((month, idx) => {
        const monthIdx = idx + 1;
        const isMonthSelected = checkIsSelected(monthIdx);

        return (
          <li key={month}>
            <MonthButton type="button" onClick={() => onMonthClick(monthIdx)} isSelected={isMonthSelected}>
              {month}
            </MonthButton>
          </li>
        );
      })}
    </List>
  );
}

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const List = styled.ul`
  display: flex;
  gap: 15px;
`;

const MonthButton = styled.button<{ isSelected: boolean }>`
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

export default MonthFilter;
