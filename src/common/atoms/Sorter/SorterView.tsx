import React, { useState } from 'react';

import { Nullable } from '@src/common/types/baseTypes';
import {
  ApplyButton,
  ArrowIcon,
  AscSortButton,
  CancelButton,
  DescSortButton,
  SorterBody,
  SorterContainer,
  SorterHeader,
  SortFooter,
  SortItemButton,
  SortListItem,
  SortOrderWrap,
  ToggleButton,
} from './sorter.styled';

const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

type SortDirectionKeys = keyof typeof SortDirection;
export type SortDirectionValues = typeof SortDirection[SortDirectionKeys];

export type SorterInitValues = {
  sortDirection: Nullable<SortDirectionValues>;
  sortField: Nullable<string>;
};

interface IProps<T> {
  options: T[];
  onFilterChange: (filters: { sortDirection?: SortDirectionValues; sortField?: string }) => void;
  initialValue: SorterInitValues;
}

interface ISorterOption {
  label: string;
  fieldName: string;
}

function SorterView<T extends ISorterOption>({ options, onFilterChange, initialValue }: IProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<SortDirectionValues>(getInitialDirectionValue());
  const [activeIdx, setActiveIdx] = useState<Nullable<number>>(getInitialSortFieldIdx());

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onAscSort = () => {
    setSortDirection(SortDirection.ASC);
  };
  const onDescSort = () => {
    setSortDirection(SortDirection.DESC);
  };

  const onCancel = () => {
    setIsOpen(false);
    setActiveIdx(null);

    onFilterChange({ sortDirection: undefined, sortField: undefined });
  };

  const onApply = () => {
    setIsOpen(false);

    if (activeIdx !== null) {
      onFilterChange({ sortDirection, sortField: options[activeIdx].fieldName });
    }
  };

  function getInitialDirectionValue() {
    const hasCorrectDirection = Object.values(SortDirection).some((direction) => {
      return direction.toUpperCase() === initialValue.sortDirection?.toUpperCase();
    });

    return hasCorrectDirection && initialValue.sortDirection !== null ? initialValue.sortDirection : SortDirection.ASC;
  }

  function getInitialSortFieldIdx() {
    const optionIdx = options.findIndex((item) => {
      return item.fieldName.toLowerCase() === initialValue.sortField?.toLowerCase();
    });

    return optionIdx !== -1 ? optionIdx : null;
  }

  return (
    <SorterContainer>
      <SorterHeader>
        sort by
        <ToggleButton type="button" onClick={toggleOpen}>
          {activeIdx !== null ? options[activeIdx].label : 'none'} <ArrowIcon isOpen={isOpen} />
        </ToggleButton>
      </SorterHeader>

      {isOpen && (
        <SorterBody>
          <ul>
            {options.map((item, idx) => (
              <SortListItem key={item.fieldName}>
                <SortItemButton isActive={activeIdx === idx} type="button" onClick={() => setActiveIdx(idx)}>
                  {item.label}
                </SortItemButton>
              </SortListItem>
            ))}
          </ul>

          <SortOrderWrap>
            <AscSortButton isActive={SortDirection.ASC === sortDirection} type="button" onClick={onAscSort}>
              ASC
            </AscSortButton>
            <DescSortButton isActive={SortDirection.DESC === sortDirection} type="button" onClick={onDescSort}>
              DESC
            </DescSortButton>
          </SortOrderWrap>

          <SortFooter>
            <CancelButton type="button" onClick={onCancel}>
              cancel
            </CancelButton>
            <ApplyButton type="button" onClick={onApply}>
              apply
            </ApplyButton>
          </SortFooter>
        </SorterBody>
      )}
    </SorterContainer>
  );
}

export default SorterView;
