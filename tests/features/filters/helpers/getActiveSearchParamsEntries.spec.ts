/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom';
import getActiveSearchParamsEntries from '@src/features/filters/helpers/getActiveSearchParamsEntries';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

describe('[HELPERS] getActiveSearchParamsEntries', () => {
  it('should return array with active features and min/max prices', () => {
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

    const activeSearchParams = getActiveSearchParamsEntries(searchParams);

    expect(params).toEqual(activeSearchParams);
  });
});
