/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom';
import removeSearchParamsFromEntriesByValue from '@src/features/filters/helpers/removeSearchParamsFromEntriesByValue';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

describe('[HELPERS] removeSearchParamsFromEntriesByValue', () => {
  it('should remove search params from entries by passed value', () => {
    const params = [
      ['features', 'Microprocessor:AMD Ryzen 5'],
      ['features', 'Video graphics:Intel Iris Xe Max'],
      ['features', 'Video graphics:NVIDIA GeForce RTX 3080'],
      ['features', 'Screen size:17'],
      ['features', 'Type of matrix:IPS'],
      ['minPrice', '11237'],
      ['maxPrice', '366381'],
    ];

    const useSearchParamsMock = (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(params),
      jest.fn(),
    ]);

    const [searchParams] = useSearchParamsMock();

    const actualEntries = removeSearchParamsFromEntriesByValue(
      searchParams,
      'NVIDIA GeForce RTX 3080',
    );

    const expectedEntries = params.filter(
      ([, description]) => !description.includes('NVIDIA GeForce RTX 3080'),
    );

    expect(actualEntries).toEqual(expectedEntries);
  });
});
