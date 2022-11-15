import { fireEvent, screen } from '@testing-library/dom';

import SorterView from '@src/common/atoms/Sorter/SorterView';
import { SORT_ORDER_OPTIONS } from '@src/features/orders/constants';
import { rootStateMock } from '../../mocks/stateMock';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: SorterView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render sort filter with default value', () => {
    setupAndRenderComponent({
      component: SorterView,
      state: rootStateMock,
      props: {
        onFilterChange: jest.fn(),
        options: SORT_ORDER_OPTIONS,
        initialValue: { sortDirection: undefined, sortField: undefined },
      },
    });

    expect(screen.getByText('sort by', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('none', { exact: false })).toBeInTheDocument();
  });

  test('should change selected filter option', () => {
    const onFilterChange = jest.fn();
    const sortOption = SORT_ORDER_OPTIONS[0];
    const nextSortDirection = 'DESC';

    setupAndRenderComponent({
      component: SorterView,
      state: rootStateMock,
      props: {
        onFilterChange,
        options: SORT_ORDER_OPTIONS,
        initialValue: { sortDirection: undefined, sortField: undefined },
      },
    });

    const selectSortMethodBtn = screen.getByText('none', { exact: false });

    fireEvent.click(selectSortMethodBtn);

    const sortOptionBtn = screen.getByText(sortOption.label, { exact: false });

    fireEvent.click(sortOptionBtn);
    fireEvent.click(screen.getByText(nextSortDirection));

    const applyBtn = screen.getByText('apply', { exact: false });

    fireEvent.click(applyBtn);

    expect(onFilterChange).toBeCalledWith({ sortField: sortOption.fieldName, sortDirection: nextSortDirection });
  });

  test('should render selected option from search params', () => {
    const onFilterChange = jest.fn();
    const sortOption = SORT_ORDER_OPTIONS[0];

    setupAndRenderComponent({
      component: SorterView,
      state: rootStateMock,
      props: {
        onFilterChange,
        options: SORT_ORDER_OPTIONS,
        initialValue: { sortDirection: 'DESC', sortField: sortOption.fieldName },
      },
    });

    expect(screen.getByText(sortOption.label, { exact: false })).toBeInTheDocument();

    fireEvent.click(screen.getByText(sortOption.label, { exact: false }));
    fireEvent.click(screen.getByText('ASC', { exact: false }));

    fireEvent.click(screen.getByText('apply', { exact: false }));

    expect(onFilterChange).toBeCalledWith({
      sortField: sortOption.fieldName,
      sortDirection: 'ASC',
    });
  });

  test('should remove selected option on cancel btn click', () => {
    const onFilterChange = jest.fn();
    const sortOption = SORT_ORDER_OPTIONS[0];

    setupAndRenderComponent({
      component: SorterView,
      state: rootStateMock,
      props: {
        onFilterChange,
        options: SORT_ORDER_OPTIONS,
        initialValue: { sortDirection: 'DESC', sortField: sortOption.fieldName },
      },
    });

    expect(screen.getByText(sortOption.label, { exact: false })).toBeInTheDocument();

    fireEvent.click(screen.getByText(sortOption.label, { exact: false }));
    fireEvent.click(screen.getByText('cancel', { exact: false }));

    expect(screen.getByText('none')).toBeInTheDocument();
  });
});
