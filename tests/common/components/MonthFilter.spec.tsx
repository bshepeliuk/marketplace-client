import { fireEvent, screen } from '@testing-library/dom';

import MonthFilter, { months } from '@src/common/components/MonthFilter/MonthFilter';
import { rootStateMock } from '../../mocks/stateMock';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: UserInfoView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render month filter', () => {
    setupAndRenderComponent({
      component: MonthFilter,
      state: rootStateMock,
      props: { onFilterChange: jest.fn() },
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
      },
    });

    const monthFilterBtn = screen.getByText(firstMonth, { exact: false });

    fireEvent.click(monthFilterBtn);

    const activeMonthItem = container.querySelector('[data-month-active="true"]');

    expect(monthFilterBtn).toBeInTheDocument();
    expect(onFilterChange).toBeCalledWith([['month', String(firstMonthIdx)]]);
    expect(activeMonthItem).toBeInTheDocument();
    expect(activeMonthItem!.textContent).toBe(firstMonth);

    fireEvent.click(monthFilterBtn);

    const activeMonth = container.querySelector('[data-month-active="true"]');

    expect(activeMonth).toBeNull();
  });
});
