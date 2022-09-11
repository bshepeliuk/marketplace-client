import React from 'react';
import { useLocation } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import DevicesByCategoryView from '@src/features/devices/pages/DevicesByCategoryView';
import { FilterProvider } from '@features/filters/context/FilterContext';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
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

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 2; // 400px - DeviceItem height, 2 - count of devices
    return children({ height, width: 1440 });
  };
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({})),
  useNavigate: () => mockNavigate,
}));

describe('[PAGES]: DevicesView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

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

  test('when devices was not found should render "not found" message.', () => {
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
});
