/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable max-len */
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import useHandleRangePrice from '@src/features/filters/hooks/useHandleRangePrice';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { FilterContext } from '@src/features/filters/context/FilterContext';
import useSyncInputStateWithRangeState from '@src/features/filters/hooks/useSyncInputStateWithRangeState';
import useHandleInputsPrice from '@src/features/filters/hooks/useHandleInputsPrice';
import { filterContextValuesMock } from '../../../mocks/data';

const mockStore = configureMockStore([thunk]);

describe('[HOOK]: useSyncInputStateWithRangeState', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('values and range should be the same on mount.', async () => {
    const rangeHookRes = renderHook(useHandleRangePrice);
    const minMaxInputHookRes = renderHook(useHandleInputsPrice);

    renderHook(useSyncInputStateWithRangeState, {
      initialProps: {
        values: minMaxInputHookRes.result.current.values,
        setRange: rangeHookRes.result.current.setRange,
        setValues: minMaxInputHookRes.result.current.setValues,
      },
      wrapper: (props: any) => (
        <Provider store={store}>
          <FilterContext.Provider
            value={{ ...filterContextValuesMock, prices: [1111, 2222] }}
          >
            {props.children}
          </FilterContext.Provider>
        </Provider>
      ),
    });

    expect(minMaxInputHookRes.result.current.values).toEqual(
      rangeHookRes.result.current.range,
    );
  });

  test('values and range should be the same when shouldBeInitial flag is true.', async () => {
    const storeWithNewPrices = mockStore({
      filters: { options: { prices: { min: 25, max: 75 } } },
    });

    const rangeHookRes = renderHook(useHandleRangePrice);
    const minMaxInputHookRes = renderHook(useHandleInputsPrice);

    renderHook(useSyncInputStateWithRangeState, {
      initialProps: {
        values: minMaxInputHookRes.result.current.values,
        setRange: rangeHookRes.result.current.setRange,
        setValues: minMaxInputHookRes.result.current.setValues,
      },
      wrapper: (props: any) => (
        <Provider store={storeWithNewPrices}>
          <FilterContext.Provider
            value={{
              ...filterContextValuesMock,
              prices: [25, 75],
              shouldBeInitial: true,
            }}
          >
            {props.children}
          </FilterContext.Provider>
        </Provider>
      ),
    });

    expect(minMaxInputHookRes.result.current.values).toEqual(
      rangeHookRes.result.current.range,
    );
  });

  test('values and range should be syncronized with global state prices on mount.', async () => {
    const rangeHookRes = renderHook(useHandleRangePrice);
    const minMaxInputHookRes = renderHook(useHandleInputsPrice);

    const storeWithNewPrices = mockStore({
      filters: { options: { prices: { min: 33, max: 99 } } },
    });

    renderHook(useSyncInputStateWithRangeState, {
      initialProps: {
        values: minMaxInputHookRes.result.current.values,
        setRange: rangeHookRes.result.current.setRange,
        setValues: minMaxInputHookRes.result.current.setValues,
      },
      wrapper: (props: any) => (
        <Provider store={storeWithNewPrices}>
          <FilterContext.Provider value={filterContextValuesMock}>
            {props.children}
          </FilterContext.Provider>
        </Provider>
      ),
    });

    expect(minMaxInputHookRes.result.current.values).toEqual(
      rangeHookRes.result.current.range,
    );
  });

  test('bounds', async () => {
    const storeWithNewPrices = mockStore({
      filters: { options: { prices: { min: 33, max: 99 } } },
    });

    const values = [55, 88];

    const setRangeMock = jest.fn();

    renderHook(
      () =>
        useSyncInputStateWithRangeState({
          values,
          setRange: setRangeMock,
          setValues: jest.fn(),
        }),
      {
        wrapper: (props: any) => (
          <Provider store={storeWithNewPrices}>
            <FilterContext.Provider
              value={{ ...filterContextValuesMock, prices: [55, 88] }}
            >
              {props.children}
            </FilterContext.Provider>
          </Provider>
        ),
      },
    );

    expect(setRangeMock).toBeCalledWith([55, 88]);
  });
});
