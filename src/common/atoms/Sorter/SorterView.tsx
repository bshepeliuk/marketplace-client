import { Nullable } from '@src/common/types/baseTypes';
import React, { useEffect, useState } from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
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
type SortDirectionValues = typeof SortDirection[SortDirectionKeys];

interface IProps<T> {
  options: T[];
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
}

interface ISorterOption {
  label: string;
  fieldName: string;
}

function SorterView<T extends ISorterOption>({ options, onFilterChange }: IProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<SortDirectionValues>(SortDirection.ASC);
  const [activeIdx, setActiveIdx] = useState<Nullable<number>>(null);

  useEffect(() => {
    if (searchParams.has('sortField') && searchParams.has('sortDirection')) {
      const optionIdx = options.findIndex((item) => {
        return item.fieldName.toLowerCase() === searchParams.get('sortField')?.toLowerCase();
      });

      if (optionIdx !== undefined) {
        setActiveIdx(optionIdx);
      }

      const searchDirectionParam = searchParams.get('sortDirection');

      const hasCorrectDirection = Object.values(SortDirection).some((direction) => {
        return direction === searchDirectionParam?.toUpperCase();
      });

      if (hasCorrectDirection && searchDirectionParam !== null) {
        setSortDirection(searchDirectionParam.toUpperCase() as SortDirectionValues);
      }
    }
  }, []);

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

    searchParams.delete('sortField');
    searchParams.delete('sortDirection');

    setSearchParams(searchParams);
  };
  const onApply = () => {
    setIsOpen(false);

    if (activeIdx !== null) {
      searchParams.set('sortField', options[activeIdx].fieldName);
      searchParams.set('sortDirection', sortDirection);
      searchParams.delete('page');

      setSearchParams(searchParams);

      const filters = getOrderFilterParams();

      onFilterChange(filters);
    }
  };

  const getOrderFilterParams = () => [...searchParams.entries()].filter(([key]) => key !== 'page');

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
