import sortByDate from '@src/common/utils/sortByDate';

const data = [
  {
    id: 1,
    createdAt: '2022-01-05T16:57:37.787Z',
  },
  {
    id: 2,
    createdAt: '2022-01-02T16:57:37.787Z',
  },
];

describe('[UTILS] sortByDate', () => {
  test('ASC', () => {
    const result = sortByDate({ data, order: 'ASC', sortField: 'createdAt' });

    expect(result).toEqual([
      {
        id: 2,
        createdAt: '2022-01-02T16:57:37.787Z',
      },
      {
        id: 1,
        createdAt: '2022-01-05T16:57:37.787Z',
      },
    ]);
  });

  test('DESC', () => {
    const result = sortByDate({ data, order: 'DESC', sortField: 'createdAt' });

    expect(result).toEqual([
      {
        id: 1,
        createdAt: '2022-01-05T16:57:37.787Z',
      },
      {
        id: 2,
        createdAt: '2022-01-02T16:57:37.787Z',
      },
    ]);
  });
});
