import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { getDevices } from '@src/features/devices/devicesSlice';
import {
  FilterContext,
  FilterProvider,
} from '@src/features/filters/context/FilterContext';
import { Wrapper } from '../../wrapper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: () => [new URLSearchParams('?categoryId=1'), jest.fn()],
}));

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDevices: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('FilterProvider', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  it('should have initial min and max prices in filter', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>shouldBeInitial: {value!.shouldBeInitial.toString()}</div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/shouldBeInitial: false/i)).toBeTruthy();
  });

  it('apply button should have initial offsetY', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return <div>btnOffsetY: {value!.btnOffsetY}</div>;
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/btnOffsetY: 0/i)).toBeTruthy();
  });

  it('should not have selected items by default', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>hasSelectedItems: {value!.hasSelectedItems.toString()}</div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/hasSelectedItems: false/i)).toBeTruthy();
  });

  it('apply btn should be hidden by default', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>isShownApplyBtn: {value!.isShownApplyBtn.toString()}</div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/isShownApplyBtn: false/i)).toBeTruthy();
  });

  it('prices should be changed by click', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>min: {value?.prices[0]}</div>
                <div>max: {value?.prices[1]}</div>
                <div>isInitPrice: {value?.isInitPrice.toString()}</div>
                <button
                  type="button"
                  onClick={() => value!.setPrices([500, 1000])}
                >
                  change filter prices
                </button>
              </div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      {
        wrapper: (props) => (
          <Wrapper
            {...props}
            state={{ filters: { options: { prices: [0, 1] } } }}
          />
        ),
      },
    );

    fireEvent.click(getByText('change filter prices'));

    expect(getByText(/min: 500/i)).toBeTruthy();
    expect(getByText(/max: 1000/i)).toBeTruthy();
    expect(getByText(/isInitPrice: false/i)).toBeTruthy();
  });

  it('item should be added to selected options by click', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>selected: {value?.selected.length}</div>
                <button
                  type="button"
                  onClick={() =>
                    value!.onSelectOption({
                      id: 1,
                      title: 'RAM',
                      description: '64 GB',
                    })
                  }
                >
                  apply RAM filter
                </button>
              </div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText('apply RAM filter'));

    expect(getByText(/selected: 1/i)).toBeTruthy();
  });

  it('item should be removed from selected in case it already added.', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>selected: {value?.selected.length}</div>
                <button
                  type="button"
                  onClick={() =>
                    value!.onSelectOption({
                      id: 1,
                      title: 'RAM',
                      description: '64 GB',
                    })
                  }
                >
                  apply RAM filter
                </button>
              </div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText('apply RAM filter'));
    fireEvent.click(getByText('apply RAM filter'));

    expect(getByText(/selected: 0/i)).toBeTruthy();
  });

  it('should clear all filters by click.', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>selected: {value?.selected.length}</div>
                <button
                  type="button"
                  onClick={() =>
                    value!.onSelectOption({
                      id: 1,
                      title: 'RAM',
                      description: '64 GB',
                    })
                  }
                >
                  apply RAM filter
                </button>
                <button type="button" onClick={value?.clearSelectedOptions}>
                  clear selected
                </button>
              </div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText('apply RAM filter'));

    expect(getByText(/selected: 1/i)).toBeTruthy();

    fireEvent.click(getByText(/clear selected/i));

    expect(getByText(/selected: 0/i)).toBeTruthy();
  });

  it('should be init price', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>isInitPrice: {value?.isInitPrice.toString()}</div>
              </div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/isInitPrice: true/i)).toBeTruthy();
  });

  it('should apply selected filters by click', () => {
    const { getByText } = render(
      <FilterProvider>
        <FilterContext.Consumer>
          {(value) => {
            return (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    value!.onSelectOption({
                      id: 1,
                      title: 'RAM',
                      description: '64 GB',
                    });
                  }}
                >
                  select RAM filter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    value!.setPrices([2500, 5500]);
                  }}
                >
                  change min & max prices
                </button>
                <button type="button" onClick={value?.apply}>
                  apply
                </button>
              </div>
            );
          }}
        </FilterContext.Consumer>
      </FilterProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText(/change min & max prices/i));
    fireEvent.click(getByText(/select RAM filter/i));
    fireEvent.click(getByText(/apply/i));

    expect(getDevices).toBeCalledWith({
      filters: [
        ['features', 'RAM:64 GB'],
        ['categoryId', '1'],
        ['minPrice', '2500'],
        ['maxPrice', '5500'],
      ],
      limit: 20,
      offset: 0,
    });
  });
});
