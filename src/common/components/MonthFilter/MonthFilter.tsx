import React, { useState } from 'react';

import { months } from '@src/common/constants';
import { List, MonthButton } from './months.styled';

interface IProps {
  onFilterChange: (filters: { month?: number[] }) => void;
  initialValues: number[];
}

function MonthFilter({ onFilterChange, initialValues }: IProps) {
  const [selected, setSelected] = useState<number[]>(initialValues);

  const onMonthClick = (idx: number) => {
    const nextState = checkIsSelected(idx) ? selected.filter((monthIdx) => monthIdx !== idx) : selected.concat(idx);

    setSelected(nextState);

    const nextValues = nextState.length === 0 ? undefined : nextState;

    onFilterChange({ month: nextValues });
  };

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

export default MonthFilter;
