import React from 'react';
import { setupServer } from 'msw/node';
import { FilterProvider } from '@features/filters/context/FilterContext';
import FilterAccordionView from '@features/filters/components/Accordion/AccordionView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { mockOptions } from '../../../mocks/data';

const server = setupServer();

const rootState = {
  entities: {},
  auth: {
    isLoggedIn: true,
  },
  categories: {
    items: [],
    isError: false,
    isLoading: false,
  },
  filters: {
    options: {
      prices: {
        min: 1000,
        max: 5000,
      },
      items: mockOptions,
    },
  },
};

describe('[COMPONENTS]: FilterAccordionView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render accordion with options from state.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => (
        <FilterProvider>
          <FilterAccordionView />
        </FilterProvider>
      ),
    });

    for (const option of mockOptions) {
      expect(getByText(option.title.toLowerCase())).toBeInTheDocument();
      expect(getByText(option.description)).toBeInTheDocument();
    }
  });
});
