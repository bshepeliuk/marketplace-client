import React from 'react';
import { setupServer } from 'msw/node';
import { FilterProvider } from '@features/filters/context/FilterContext';
import { waitFor } from '@testing-library/dom';
import FilterAccordionView from '@features/filters/components/Accordion/AccordionView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { mockOptions } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const server = setupServer();

describe('[COMPONENTS]: FilterAccordionView', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render accordion with options from state.', async () => {
    const { getByText } = setupAndRenderComponent({
      state: {
        ...rootStateMock,
        filters: {
          options: {
            prices: {
              min: 1000,
              max: 5000,
            },
            items: mockOptions,
          },
        },
      },
      component: () => (
        <FilterProvider>
          <FilterAccordionView />
        </FilterProvider>
      ),
    });

    await waitFor(
      () => {
        for (const option of mockOptions) {
          expect(getByText(option.title.toLowerCase())).toBeInTheDocument();
          expect(getByText(option.description)).toBeInTheDocument();
        }
      },
      { timeout: 2000 },
    );
  });
});
