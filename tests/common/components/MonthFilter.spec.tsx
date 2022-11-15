import { fireEvent, screen } from '@testing-library/dom';

import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import { months } from '@src/common/constants';
import { rootStateMock } from '../../mocks/stateMock';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: MonthFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render month filter', () => {
    setupAndRenderComponent({
      component: MonthFilter,
      state: rootStateMock,
      props: { onFilterChange: jest.fn(), initialValues: [] },
    });

    for (const month of months) {
      expect(screen.getByText(month)).toBeInTheDocument();
    }
  });

  test('should change month.', () => {
    const onFilterChange = jest.fn();

    const firstMonth = months[0];
    const firstMonthIdx = 1;

    const { container } = setupAndRenderComponent({
      component: MonthFilter,
      state: rootStateMock,
      props: {
        onFilterChange,
        initialValues: [],
      },
    });

    const monthFilterBtn = screen.getByText(firstMonth, { exact: false });

    fireEvent.click(monthFilterBtn);

    const activeMonthItem = container.querySelector('[data-month-active="true"]');

    expect(monthFilterBtn).toBeInTheDocument();

    expect(onFilterChange).toBeCalledWith({ month: [firstMonthIdx] });
    expect(activeMonthItem).toBeInTheDocument();
    expect(activeMonthItem!.textContent).toBe(firstMonth);

    fireEvent.click(monthFilterBtn);

    const activeMonth = container.querySelector('[data-month-active="true"]');

    expect(activeMonth).toBeNull();
  });
});
