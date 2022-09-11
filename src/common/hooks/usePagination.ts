import { range } from '../utils/range';

export interface IPaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}

const DOTS = '...';

export const isItDots = (step: number | string) => step === DOTS;

export const usePagination = ({ totalCount, pageSize, currentPage, siblingCount = 1 }: IPaginationProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  const visibleStepsAfterOrBeforeDots = 5;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = visibleStepsAfterOrBeforeDots * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = visibleStepsAfterOrBeforeDots * siblingCount;
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return range(1, totalPageCount);
};

export default usePagination;
