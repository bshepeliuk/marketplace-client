/* eslint-disable max-len */
import { useSearchParams } from 'react-router-dom';
import joinMinMaxPricesInEntries from '@src/features/filters/helpers/joinMinMaxPricesInEntries';
import parseFeaturesParams from '@src/features/filters/helpers/parseFeaturesParams';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

describe('[HELPERS] joinMinMaxPricesInEntries', () => {
  it('should join minPrice and maxPrice entries to one entry: ["prices", "100 - 3000"]', () => {
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

    const parsedFeatures = parseFeaturesParams(
      Array.from(searchParams.entries()),
    );

    const updatedFeaturesEntries = joinMinMaxPricesInEntries(parsedFeatures);

    const pricesEntry = updatedFeaturesEntries.find(
      ([title]) => title === 'prices',
    );

    expect(pricesEntry).toEqual(['prices', '11237 - 366381']);
  });
});
