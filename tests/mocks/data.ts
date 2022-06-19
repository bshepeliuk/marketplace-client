import { ParamKeyValuePair } from 'react-router-dom';

export const mockOptions = [
  {
    id: 2,
    typeId: 1,
    title: 'Microprocessor',
    description: 'AMD Ryzen 7',
  },
  {
    id: 3,
    typeId: 1,
    title: 'Video graphics',
    description: 'AMD Radeon RX Vega 3',
  },
  {
    id: 4,
    typeId: 1,
    title: 'Screen resolution',
    description: '2560 x 1440',
    deviceId: 1,
  },
  {
    id: 5,
    typeId: 1,
    title: 'Screen size',
    description: '13',
  },
  {
    id: 6,
    typeId: 1,
    title: 'Type of matrix',
    description: 'IPS',
  },
  {
    id: 7,
    typeId: 1,
    title: 'RAM',
    description: '16',
  },
];

export const goods = [
  {
    id: 2,
    name: 'HP Pavillion 15 eh1021-ua',
    price: 33448,
    brandId: 2,
    typeId: 1,
    userId: 1,
    quantity: 1,
    images: [],
    info: [],
    count: 1,
    createdAt: '2022-01-05T16:57:37.787Z',
    updatedAt: '2022-01-05T16:57:37.787Z',
  },
  {
    id: 3,
    name: 'DELL Lattitude 7505',
    price: 36638,
    brandId: 4,
    typeId: 1,
    userId: 2,
    quantity: 2,
    images: [],
    info: [],
    count: 1,
    createdAt: '2021-07-10T10:29:45.277Z',
    updatedAt: '2021-07-10T10:29:45.277Z',
  },
];

export const filterContextValuesMock = {
  btnOffsetY: 0,
  setBtnOffsetY: jest.fn(),
  selected: Array(2),
  setSelected: jest.fn(),
  onSelectOption: jest.fn(),
  clearSelectedOptions: jest.fn(),
  isShownApplyBtn: false,
  setIsShownApplyBtn: jest.fn(),
  hasSelectedItems: true,
  setPrices: jest.fn(),
  apply: jest.fn(),
  prices: [],
  shouldBeInitial: false,
  isInitPrice: false,
  getFilterParams: jest.fn(),
  setShouldBeInitial: jest.fn(),
};

export const categories = [
  {
    id: 1,
    name: 'laptops',
    createdAt: '2021-07-20T16:25:34.061Z',
    updatedAt: '2021-07-20T16:25:34.061Z',
  },
  {
    id: 2,
    name: 'tablets',
    createdAt: '2021-05-29T06:14:42.024Z',
    updatedAt: '2021-05-29T06:14:42.024Z',
  },
  {
    id: 3,
    name: 'phones',
    createdAt: '2021-06-11T06:34:35.158Z',
    updatedAt: '2021-06-11T06:34:35.158Z',
  },
  {
    id: 4,
    name: 'TVs',
    createdAt: '2021-12-26T02:54:47.083Z',
    updatedAt: '2021-12-26T02:54:47.083Z',
  },
  {
    id: 5,
    name: 'cameras',
    createdAt: '2021-12-19T19:49:56.187Z',
    updatedAt: '2021-12-19T19:49:56.187Z',
  },
  {
    id: 6,
    name: 'test-type',
    createdAt: '2022-05-07T06:07:05.350Z',
    updatedAt: '2022-05-07T06:07:05.350Z',
  },
];

export const brands = [
  {
    id: 1,
    name: 'ASUS',
    createdAt: '2021-07-20T16:25:34.061Z',
    updatedAt: '2021-07-20T16:25:34.061Z',
  },
  {
    id: 2,
    name: 'HP',
    createdAt: '2021-05-29T06:14:42.024Z',
    updatedAt: '2021-05-29T06:14:42.024Z',
  },
  {
    id: 3,
    name: 'DELL',
    createdAt: '2021-06-11T06:34:35.158Z',
    updatedAt: '2021-06-11T06:34:35.158Z',
  },
];

export const paramsEntries = [
  ['features', 'Microprocessor:AMD Ryzen 5'],
  ['features', 'Video graphics:Intel Iris Xe Max'],
  ['features', 'Video graphics:NVIDIA GeForce RTX 3080'],
  ['features', 'Screen size:17'],
  ['features', 'Type of matrix:IPS'],
  ['minPrice', '11237'],
  ['maxPrice', '366381'],
] as ParamKeyValuePair[];

export const entitiesValuesMock = {
  images: {
    '2': {
      id: 2,
      url: 'https://content.rozetka.com.ua/goods/images/big/194295560.jpg',
      deviceId: 3,
    },
  },
  info: {
    '14': {
      id: 14,
      typeId: 1,
      title: 'Microprocessor',
      description: 'Intel Core i7',
      deviceId: 3,
      createdAt: '2022-03-30T17:41:05.345Z',
      updatedAt: '2022-03-30T17:41:05.345Z',
    },
    '15': {
      id: 15,
      typeId: 1,
      title: 'Video graphics',
      description: 'NVIDIA GeForce RTX 3070',
      deviceId: 3,
      createdAt: '2021-07-29T15:45:54.223Z',
      updatedAt: '2021-07-29T15:45:54.223Z',
    },
    '16': {
      id: 16,
      typeId: 1,
      title: 'Screen resolution',
      description: '2560 x 1440',
      deviceId: 3,
      createdAt: '2021-01-09T00:13:09.663Z',
      updatedAt: '2021-01-09T00:13:09.663Z',
    },
    '17': {
      id: 17,
      typeId: 1,
      title: 'Screen size',
      description: '15.6',
      deviceId: 3,
      createdAt: '2022-04-12T06:37:34.096Z',
      updatedAt: '2022-04-12T06:37:34.096Z',
    },
    '18': {
      id: 18,
      typeId: 1,
      title: 'Type of matrix',
      description: 'TN',
      deviceId: 3,
      createdAt: '2022-04-30T02:43:54.896Z',
      updatedAt: '2022-04-30T02:43:54.896Z',
    },
    '19': {
      id: 19,
      typeId: 1,
      title: 'RAM',
      description: '4',
      deviceId: 3,
      createdAt: '2021-03-05T22:42:31.936Z',
      updatedAt: '2021-03-05T22:42:31.936Z',
    },
  },
  devices: {
    '3': {
      id: 3,
      name: 'DELL Lattitude 7505',
      price: 36638,
      brandId: 4,
      typeId: 1,
      userId: 2,
      quantity: 2,
      createdAt: '2021-07-10T10:29:45.277Z',
      updatedAt: '2021-07-10T10:29:45.277Z',
      images: [2],
      info: [14, 15, 16, 17, 18, 19],
    },
  },
};
