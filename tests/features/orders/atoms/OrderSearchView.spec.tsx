import selectEvent from 'react-select-event';
import { fireEvent, screen, waitFor } from '@testing-library/dom';

import OrderSearchView from '@src/features/orders/atoms/OrderSearchView';
import { SEARCH_ORDER_OPTIONS } from '@src/features/orders/constants';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const emptyFilters = SEARCH_ORDER_OPTIONS.reduce((prev, current) => ({ ...prev, [current.fieldName]: undefined }), {});

describe('[COMPONENTS]: OrderStatusSelect', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render search input with order field selector.', async () => {
    setupAndRenderComponent({
      component: OrderSearchView,
      state: rootStateMock,
      props: { onFilterChange: jest.fn(), options: SEARCH_ORDER_OPTIONS, initialValue: [] },
    });

    expect(screen.getByText('Order id', { exact: false })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by order id', { exact: false })).toBeInTheDocument();
  });

  test('should change fieldName and value for searching element.', async () => {
    const onFilterChangeMock = jest.fn();
    const defaultSearchField = 'Order id';

    const searchOrderOption = SEARCH_ORDER_OPTIONS.find(
      (item) => item.label.toLowerCase() !== defaultSearchField.toLowerCase(),
    );

    setupAndRenderComponent({
      component: OrderSearchView,
      state: rootStateMock,
      props: { onFilterChange: onFilterChangeMock, options: SEARCH_ORDER_OPTIONS, initialValue: [] },
    });

    const searchFieldSelector = screen.getByText(defaultSearchField, { exact: false });

    expect(searchFieldSelector).toBeInTheDocument();

    if (searchOrderOption !== undefined) {
      await selectEvent.select(searchFieldSelector, searchOrderOption.value);

      expect(screen.getByText(searchOrderOption.value, { exact: false })).toBeInTheDocument();

      const searchInput = screen.getByPlaceholderText(`Search by ${searchOrderOption.value}`, {
        exact: false,
      }) as HTMLInputElement;

      expect(searchInput).toBeInTheDocument();

      const newInputValue = 'Tony Stark';

      fireEvent.change(searchInput, { target: { value: newInputValue } });

      expect(searchInput.value).toBe(newInputValue);

      await waitFor(
        () => {
          expect(onFilterChangeMock).toBeCalledWith({ ...emptyFilters, [searchOrderOption.fieldName]: newInputValue });
        },
        { timeout: 2000 },
      );
    }
  });

  test('should have fieldName and value from search params as initial values.', async () => {
    const onFilterChangeMock = jest.fn();
    const defaultSearchField = 'Customer';
    const valueFromParams = 'Tony Stark';

    const searchOrderOption = SEARCH_ORDER_OPTIONS.find(
      (item) => item.label.toLowerCase() === defaultSearchField.toLowerCase(),
    );

    setupAndRenderComponent({
      component: OrderSearchView,
      state: rootStateMock,
      props: {
        onFilterChange: onFilterChangeMock,
        options: SEARCH_ORDER_OPTIONS,
        initialValue: [searchOrderOption!.fieldName, valueFromParams],
      },
    });

    expect(screen.getByText(searchOrderOption!.label)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(
      `Search by ${searchOrderOption?.label.toLowerCase()}`,
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe(valueFromParams);
  });
});
