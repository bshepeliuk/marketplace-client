import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import { fireEvent } from '@testing-library/dom';
import { getDevices } from '@src/features/devices/devicesSlice';
import { DEVICES_LIMIT } from '@src/features/devices/constants';
import DevicesByCategoryView from '@src/features/devices/pages/DevicesByCategoryView';
import { FilterProvider } from '@features/filters/context/FilterContext';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { deviceMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const server = setupServer(
  rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
    return res(
      ctx.json({
        devices: [],
      }),
    );
  }),
);

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDevices: jest.fn(),
}));

const scrollToMock = jest.fn();
window.scrollTo = scrollToMock;

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({})),
  useNavigate: () => mockNavigate,
  useSearchParams: jest.fn().mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

describe('[PAGES]: DevicesByCategoryView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render device list from state', () => {
    const { getByText } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: rootStateMock,
    });

    expect(getByText(deviceMock.name)).toBeInTheDocument();
  });

  test('should redirect to home page when search params is empty.', () => {
    (useLocation as jest.Mock).mockImplementation(() => ({
      pathname: '/devices',
      search: '',
    }));

    setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: rootStateMock,
    });

    expect(mockNavigate).toBeCalledWith('/');
  });

  test('when devices was not found, should render "not found" message.', () => {
    const { getByText } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: {
        ...rootStateMock,
        devices: { ...rootStateMock.devices, hasNoDevices: true },
      },
    });

    expect(getByText(/No devices in this category yet./i)).toBeInTheDocument();
  });

  test('should render pagination when amount of items more than limit.', () => {
    const { container } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: rootStateMock,
    });

    const paginationList = container.querySelector('[data-pagination-list="pagination-list"]') as HTMLUListElement;

    expect(paginationList).toBeInTheDocument();
  });

  test('should scroll to the top when page has changed.', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams([
        ['categoryId', String(deviceMock.id)],
        ['page', '2'],
      ]),
      jest.fn(),
    ]);

    const { container } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: rootStateMock,
    });

    const pageNumber = 2;

    const paginationItem = container.querySelector(`[data-pagination-item="${pageNumber}"]`) as HTMLLIElement;

    fireEvent.click(paginationItem);

    expect(paginationItem).toBeInTheDocument();
    expect(scrollToMock).toBeCalledTimes(1);
    expect(getDevices).lastCalledWith({
      filters: [
        ['categoryId', String(deviceMock.id)],
        ['page', '2'],
      ],
      limit: DEVICES_LIMIT,
      offset: DEVICES_LIMIT * (pageNumber - 1),
    });
  });

  test('should render error when something went wrong.', () => {
    const { getByText } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: { ...rootStateMock, devices: { ...rootStateMock.devices, isError: true } },
    });

    expect(
      getByText('Unfortunately something went wrong. Kindly try again later.', { exact: false }),
    ).toBeInTheDocument();
  });

  test('should fetch devices when categoryId was changed.', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams([['categoryId', String(deviceMock.id)]]),
      jest.fn(),
    ]);

    setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesByCategoryView />
        </FilterProvider>
      ),
      state: { ...rootStateMock, devices: { ...rootStateMock.devices, isError: true } },
    });

    expect(getDevices).toBeCalledWith({
      filters: [['categoryId', String(deviceMock.id)]],
      limit: DEVICES_LIMIT,
      offset: 0,
    });
  });
});
