import selectEvent from 'react-select-event';
import { screen, waitFor } from '@testing-library/dom';

import createOption from '@src/common/utils/createSelectOption';
import YearSelector from '@src/common/components/YearSelector/YearSelector';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

jest.mock('react-toastify');

const yearOptionsMock = [createOption(2022), createOption(2021)];

const onLoadYearOptionsMock = jest.fn(() => Promise.resolve(yearOptionsMock));

describe('[COMPONENTS]: YearSelector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have year order selector', async () => {
    setupAndRenderComponent({
      component: YearSelector,
      state: rootStateMock,
      props: {
        onFilterChange: jest.fn(),
        onLoadYearOptions: onLoadYearOptionsMock,
      },
    });

    await waitFor(() => {
      expect(screen.getByText('Select order year.', { exact: false })).toBeInTheDocument();
      expect(onLoadYearOptionsMock).toBeCalledTimes(1);
    });
  });

  test('should have menu with order years from server.', async () => {
    setupAndRenderComponent({
      component: YearSelector,
      state: rootStateMock,
      props: {
        onFilterChange: jest.fn(),
        onLoadYearOptions: onLoadYearOptionsMock,
      },
    });

    const select = await screen.findByText('Select order year.', { exact: false });

    await selectEvent.openMenu(select);

    await waitFor(() => {
      for (const option of yearOptionsMock) {
        expect(screen.getByText(option.value, { exact: true })).toBeInTheDocument();
      }
    });
  });

  test('should select and clear order year option.', async () => {
    const onFilterChangeMock = jest.fn();
    const yearOption = yearOptionsMock[0];

    setupAndRenderComponent({
      component: YearSelector,
      state: rootStateMock,
      props: {
        onFilterChange: onFilterChangeMock,
        onLoadYearOptions: onLoadYearOptionsMock,
      },
    });

    const select = await screen.findByText('Select order year.', { exact: false });

    await selectEvent.select(select, yearOption.value);

    const selected = screen.getByText(yearOption.value, { exact: true });

    expect(selected).toBeInTheDocument();

    expect(onFilterChangeMock).toBeCalledWith({ year: yearOption.value });

    await selectEvent.clearAll(selected);

    expect(screen.getByText('Select order year.', { exact: false })).toBeInTheDocument();
  });
});
