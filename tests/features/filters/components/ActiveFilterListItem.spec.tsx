/* eslint-disable max-len */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { ActiveListItemView } from '@features/filters/components/ActiveFilterList/ActiveFilterListView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest.fn().mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

describe('[COMPONENTS]: ActiveListItemView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render FilterListItem with passed props.', () => {
    const item = ['Microprocessor', 'Intel Core i5'];

    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => <ActiveListItemView item={item} />,
    });

    const ActiveItem = getByText(item[1]);

    expect(ActiveItem).toBeInTheDocument();
  });

  test('should remove item from search params by click', async () => {
    const item = ['Microprocessor', 'Intel Core i5'];

    const useSearchParamsMock = (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams([item, ['categoryId', '1']]),
      jest.fn(),
    ]);

    const [, setSearchParamsMock] = useSearchParamsMock();

    const { container } = setupAndRenderComponent({
      state: {},
      component: () => <ActiveListItemView item={item} />,
    });

    const RemoveBtn = container.querySelector('[data-delete-item-btn]') as HTMLButtonElement;

    fireEvent.click(RemoveBtn);

    expect(RemoveBtn).toBeInTheDocument();

    await waitFor(
      () => {
        expect(setSearchParamsMock).toBeCalledWith([['categoryId', '1']]);
      },
      { timeout: 1000 },
    );
  });

  test('should remove min and max prices from search params by click', async () => {
    const useSearchParamsMock = (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams([
        ['minPrice', '55'],
        ['maxPrice', '88'],
        ['categoryId', '4'],
      ]),
      jest.fn(),
    ]);

    const [, setSearchParamsMock] = useSearchParamsMock();

    const { container } = setupAndRenderComponent({
      state: {},
      component: () => <ActiveListItemView item={['prices', '55 - 88']} />,
    });

    const RemoveBtn = container.querySelector('[data-delete-item-btn]') as HTMLButtonElement;

    fireEvent.click(RemoveBtn);

    expect(RemoveBtn).toBeInTheDocument();

    await waitFor(
      () => {
        expect(setSearchParamsMock).toBeCalledWith([['categoryId', '4']]);
      },
      { timeout: 1000 },
    );
  });
});
