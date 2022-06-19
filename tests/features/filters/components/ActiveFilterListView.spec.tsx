/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import parseFeaturesParams from '@features/filters/helpers/parseFeaturesParams';
import ActiveFilterListView from '@features/filters/components/ActiveFilterList/ActiveFilterListView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

const params = [
  ['features', 'Microprocessor:AMD Ryzen 5'],
  ['features', 'Video graphics:Intel Iris Xe Max'],
  ['features', 'Video graphics:NVIDIA GeForce RTX 3080'],
  ['features', 'Screen size:17'],
  ['features', 'Type of matrix:IPS'],
  ['minPrice', '11237'],
  ['maxPrice', '366381'],
];

describe('[COMPONENTS]: ActiveFilterListView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render FilterList from search params.', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(params),
      jest.fn(),
    ]);

    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => <ActiveFilterListView />,
    });

    const parsedActiveParams = parseFeaturesParams(params);

    expect(getByText(/11237 - 366381/i)).toBeInTheDocument();

    for (const [title, description] of parsedActiveParams) {
      if (title !== 'minPrice' && title !== 'maxPrice') {
        expect(getByText(description)).toBeInTheDocument();
      }
    }
  });

  test('should set params on click clear btn.', () => {
    const useSearchParamsMock = (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams([...params, ['categoryId', '1']]),
      jest.fn(),
    ]);

    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => <ActiveFilterListView />,
    });

    const ClearAllBtn = getByText(/clear/i);

    expect(ClearAllBtn).toBeInTheDocument();

    fireEvent.click(ClearAllBtn);

    const [, setSearchParams] = useSearchParamsMock();

    expect(setSearchParams).toBeCalledWith([['categoryId', '1']]);
  });
});
