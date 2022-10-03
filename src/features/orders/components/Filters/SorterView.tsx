import { Nullable } from '@src/common/types/baseTypes';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ORDERS_LIMIT } from '../../constants';
import useGetOrders from '../../hooks/useGetOrders';

const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

type SortDirectionKeys = keyof typeof SortDirection;
type SortDirectionValues = typeof SortDirection[SortDirectionKeys];

interface IProps<T> {
  options: T[];
}

interface ISorterOption {
  label: string;
  fieldName: string;
}

function SorterView<T extends ISorterOption>({ options }: IProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState<SortDirectionValues>(SortDirection.ASC);
  const [activeIdx, setActiveIdx] = useState<Nullable<number>>(null);
  const { fetchOrders } = useGetOrders();

  const FIRST_PAGE = 1;
  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

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

  const toggleOpen = () => setIsOpen(!isOpen);

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

      setSearchParams(searchParams);

      fetchOrders({
        limit: ORDERS_LIMIT,
        offset,
        filters: [...searchParams.entries()].filter(([key]) => key !== 'page'), // TODO: create helper;
      });
    }
  };

  return (
    <SorterContainer>
      <SorterHeader>
        sort by
        <Button type="button" onClick={toggleOpen}>
          {activeIdx !== null ? options[activeIdx].label : 'none'} <ArrowIcon isOpen={isOpen} />
        </Button>
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

const SorterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  white-space: nowrap;
`;

const SorterHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #f9f9f9;
  height: 100%;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  letter-spacing: 1px;
  color: #778ca3;
`;

const SorterBody = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  z-index: 100;
  width: 100%;
  padding: 10px;

  background-color: hsl(0, 0%, 100%);
  border-radius: 4px;
  box-shadow: 0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 4px 10px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  border-radius: 2px;
  color: #16a596;
`;

const SortOrderWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;
const SortOrderButton = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 10px;
  padding: 4px 0;
  letter-spacing: 1px;
  transition: all 0.5s ease-out;
  border: 1px solid #1abc9c;
`;

const AscSortButton = styled(SortOrderButton)<{ isActive: boolean }>`
  color: #fff;
  font-weight: bold;
  border-radius: 5px 0 0 5px;
  background-color: ${(props) => (props.isActive ? '#1abc9c' : '#fff')};
  color: ${(props) => (props.isActive ? '#fff' : '#1abc9c')};
`;

const DescSortButton = styled(SortOrderButton)<{ isActive: boolean }>`
  color: #fff;
  font-weight: bold;
  border-radius: 0 5px 5px 0;
  background-color: ${(props) => (props.isActive ? '#1abc9c' : '#fff')};
  color: ${(props) => (props.isActive ? '#fff' : '#1abc9c')};
`;

const SortListItem = styled.li`
  margin-bottom: 5px;
`;

const SortItemButton = styled.button<{ isActive: boolean }>`
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease-out;
  color: ${(props) => (props.isActive ? '#16a596' : '#00303f')};

  &:hover {
    color: #16a596;
  }
`;

const SortFooter = styled.div`
  margin-top: 15px;
`;

const CancelButton = styled.button`
  width: 50%;
  cursor: pointer;
  background-color: #f1f1f1;
  border: none;
  color: #0a3d62;
  letter-spacing: 1px;
  padding: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #f4f4f2;
  }
`;
const ApplyButton = styled.button`
  width: 50%;
  cursor: pointer;
  background-color: #82ccdd;
  letter-spacing: 1px;
  border: none;
  color: #fff;
  padding: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #3498db;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ArrowIcon = styled(({ isOpen, ...props }) => <IoIosArrowForward {...props} />)<{
  isOpen: boolean;
  props: unknown;
}>`
  font-size: 1.1em;
  transition: all 0.3s ease-in-out;
  transform: ${({ isOpen }) => {
    return isOpen ? 'rotate(-90deg)' : 'rotate(90deg)';
  }};
`;

export default SorterView;
