import { waitFor, fireEvent, render } from '@testing-library/react';
import React from 'react';
import PriceFilterView from '@features/filters/components/PriceFilter/PriceFilterView';
import { FilterProvider } from '@src/features/filters/context/FilterContext';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { Wrapper } from '../../../wrapper';

const prices = {
  min: 3000,
  max: 10_000,
};

const state = {
  ...rootStateMock,
  filters: {
    ...rootStateMock.filters,
    options: {
      ...rootStateMock.filters.options,
      prices,
    },
  },
};

describe('[COMPONENTS]: PriceFilterView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should change value for min price input.', async () => {
    const { container } = setupAndRenderComponent({
      state,
      component: () => (
        <FilterProvider>
          <PriceFilterView />
        </FilterProvider>
      ),
    });

    const minPriceInput = container.querySelector(`input[name="min"]`) as HTMLInputElement;

    fireEvent.change(minPriceInput, {
      target: { value: 4000 },
    });

    await waitFor(
      () => {
        expect(minPriceInput.value).toBe('4000');
      },
      { timeout: 1000 },
    );
  });

  test('in case current value greater than max, should change value to max.', async () => {
    const { container } = render(
      <FilterProvider>
        <PriceFilterView />
      </FilterProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
      },
    );

    const maxPriceInput = container.querySelector(`input[name="max"]`) as HTMLInputElement;

    fireEvent.change(maxPriceInput, {
      target: { value: 14520 },
    });

    await waitFor(
      () => {
        expect(maxPriceInput.value).toBe(String(prices.max));
      },
      { timeout: 500 },
    );
  });

  test('in case current value less than min, should change value to min.', async () => {
    const { container } = setupAndRenderComponent({
      state,
      component: () => (
        <FilterProvider>
          <PriceFilterView />
        </FilterProvider>
      ),
    });

    const minPriceInput = container.querySelector(`input[name="min"]`) as HTMLInputElement;

    fireEvent.change(minPriceInput, {
      target: { value: -500 },
    });

    await waitFor(
      () => {
        expect(minPriceInput.value).toBe(String(prices.min));
      },
      { timeout: 500 },
    );
  });

  test('in case min value greater than max, should change value to min.', async () => {
    const { container } = setupAndRenderComponent({
      state,
      component: () => (
        <FilterProvider>
          <PriceFilterView />
        </FilterProvider>
      ),
    });

    const minPriceInput = container.querySelector(`input[name="min"]`) as HTMLInputElement;

    fireEvent.change(minPriceInput, {
      target: { value: 100500 },
    });

    await waitFor(
      () => {
        expect(minPriceInput.value).toBe(String(prices.min));
      },
      { timeout: 500 },
    );
  });
});
