import { renderHook } from '@testing-library/react-hooks';
import usePagination, { DOTS } from '@src/common/hooks/usePagination';

describe('[HOOK]: usePagination', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return array with number of pages.', () => {
    const totalCount = 20;
    const pageSize = 5;

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const { result } = renderHook(() => {
      return usePagination({ totalCount, pageSize, currentPage: 1 });
    });

    expect(result.current.length).toBe(totalPageCount);
  });

  test('in case it is last page, should have dots.', () => {
    const totalCount = 40;
    const pageSize = 5;

    const { result } = renderHook(() => {
      return usePagination({ totalCount, pageSize, currentPage: 5 });
    });

    expect(result.current.includes(DOTS)).toBeTruthy();
  });

  test('in case it is middle page, should have left and right dots.', () => {
    const totalCount = 200;
    const pageSize = 5;

    const middlePage = Math.ceil(totalCount / pageSize / 2);

    const { result } = renderHook(() => {
      return usePagination({ totalCount, pageSize, currentPage: middlePage });
    });

    const dotsInPages = result.current.filter((item) => item === DOTS);

    expect(dotsInPages.length).toBe(2);
  });

  test('in case page number less than middle, should have right dots.', () => {
    const totalCount = 200;
    const pageSize = 5;

    const { result } = renderHook(() => {
      return usePagination({ totalCount, pageSize, currentPage: 2 });
    });

    const dotsInPages = result.current.filter((item) => item === DOTS);

    expect(dotsInPages.length).toBe(1);
  });
});
