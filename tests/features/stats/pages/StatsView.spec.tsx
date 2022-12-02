/* eslint-disable class-methods-use-this */
import React from 'react';
import { screen } from '@testing-library/dom';

import StatsView from '@src/features/stats/pages/StatsView';
import { months } from '@src/common/constants';
import { routes } from '@src/app/Router';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import server from '../../../mocks/api/server';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children, height }: { children: React.ReactNode; height: number }) => (
      <OriginalModule.ResponsiveContainer width={800} height={height}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe('[COMPONENTS]: StatsView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render devices stats.', () => {
    const { container } = setupAndRenderComponent({
      component: StatsView,
      state: rootStateMock,
    });
    const devicesBarChart = container.querySelector('[data-component="devices-bar-chart"]');
    const categoriesBarChart = container.querySelector('[data-component="categories-bar-chart"]');

    expect(devicesBarChart).toBeInTheDocument();
    expect(categoriesBarChart).toBeInTheDocument();
  });

  test('should render stats filter.', () => {
    setupAndRenderComponent({
      component: StatsView,
      state: rootStateMock,
    });

    expect(screen.getByText('Select order year', { exact: false })).toBeInTheDocument();

    for (const month of months) {
      expect(screen.getByText(month, { exact: false })).toBeInTheDocument();
    }
  });

  test('should render stats navigation.', () => {
    setupAndRenderComponent({
      component: StatsView,
      state: rootStateMock,
    });
    const devicesStatsLink = screen.getByText('devices', { exact: false });
    const customersStatsLink = screen.getByText('customers', { exact: false });
    const ordersStatsLink = screen.getByText('orders', { exact: false });

    expect(devicesStatsLink).toBeInTheDocument();
    expect(devicesStatsLink.getAttribute('href')).toBe(routes.stats);
    expect(customersStatsLink).toBeInTheDocument();
    expect(customersStatsLink.getAttribute('href')).toBe(`${routes.stats}/customer`);
    expect(ordersStatsLink).toBeInTheDocument();
    expect(ordersStatsLink.getAttribute('href')).toBe(`${routes.stats}/orders`);
  });
});
