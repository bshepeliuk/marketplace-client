import React from 'react';
import { useLocation } from 'react-router-dom';
import { normalize } from 'normalizr';
import DevicesView from '@features/devices/pages/DevicesView';
import { FilterProvider } from '@features/filters/context/FilterContext';
import { DevicesSchema } from '@src/common/normalizeSchemas';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { goods } from '../../../mocks/data';

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

const { result, entities } = normalize(goods, DevicesSchema);

const rootState = {
  entities,
  auth: {
    isLoggedIn: true,
  },
  devices: {
    isLoading: false,
    items: result,
  },
  categories: {
    isLoading: false,
    items: [],
  },
  filters: {
    options: {
      items: [],
      prices: {},
    },
  },
  cart: {
    items: [],
  },
};

describe('[PAGES]: DevicesView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device list from state', () => {
    const { getByText } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesView />
        </FilterProvider>
      ),
      state: rootState,
    });

    for (const device of goods) {
      expect(getByText(device.name)).toBeInTheDocument();
    }
  });

  test('should redirect to home page when search params is empty.', () => {
    (useLocation as jest.Mock).mockImplementation(() => ({
      pathname: '/devices',
      search: '',
    }));

    setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesView />
        </FilterProvider>
      ),
      state: rootState,
    });

    expect(mockNavigate).toBeCalledWith('/');
  });

  test('when devices was not found should render "not found" message.', () => {
    const { getByText } = setupAndRenderComponent({
      component: () => (
        <FilterProvider>
          <DevicesView />
        </FilterProvider>
      ),
      state: {
        ...rootState,
        devices: { ...rootState.devices, hasNoDevices: true },
      },
    });

    expect(getByText(/No devices in this category yet./i)).toBeInTheDocument();
  });
});
