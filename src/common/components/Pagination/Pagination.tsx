import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import usePagination, { IPaginationProps, isItDots } from '@src/common/hooks/usePagination';
import { ArrowButton, DotsItem, PaginationItem, PaginationList, PaginationWrapper } from './pagination.styled';

interface IPagination extends IPaginationProps {
  onPageChange: (page: number) => void;
}

function Pagination({ pageSize, totalCount, currentPage, onPageChange, siblingCount = 1 }: IPagination) {
  const steps = usePagination({ pageSize, totalCount, currentPage, siblingCount });

  const firstPage = 1;
  const lastPage = steps[steps.length - 1];

  const hasNoPrev = currentPage === firstPage;
  const hasNoNext = currentPage === lastPage;

  const onNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevPage = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <PaginationWrapper>
      <ArrowButton type="button" onClick={onPrevPage} disabled={hasNoPrev}>
        <BiChevronLeft />
      </ArrowButton>

      <PaginationList>
        {steps.map((step, idx) => {
          const isActive = step === currentPage;

          if (isItDots(step)) return <DotsItem key={idx}>{step}</DotsItem>;

          return (
            <PaginationItem key={idx} isActive={isActive} onClick={() => onPageChange(Number(step))}>
              {step}
            </PaginationItem>
          );
        })}
      </PaginationList>

      <ArrowButton type="button" onClick={onNextPage} disabled={hasNoNext}>
        <BiChevronRight />
      </ArrowButton>
    </PaginationWrapper>
  );
}

export default Pagination;
