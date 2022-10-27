import React, { useState } from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import { List, MonthButton } from './months.styled';

interface IProps {
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
}

export function MonthFilter({ onFilterChange }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValues = () => Array.from(searchParams.getAll('month').values()).map(Number);
  const [selected, setSelected] = useState<number[]>(initialValues);

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
          <li key={month} data-month-active={isMonthSelected}>
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

export default MonthFilter;
