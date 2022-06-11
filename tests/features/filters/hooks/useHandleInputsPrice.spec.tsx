import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import useHandleInputsPrice from '@src/features/filters/hooks/useHandleInputsPrice';

describe('useHandleInputsPrice', () => {
  test('initial rendering', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    expect(result.current.values).toEqual([0, 0]);
    expect(typeof result.current.setValues).toBe('function');
    expect(typeof result.current.handleInputChange).toBe('function');
  });

  test('setValues should change initial values', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    act(() => {
      result.current.setValues([1, 2]);
    });

    expect(result.current.values).toEqual([1, 2]);
  });

  test('should change min value in state.', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    const { getByTestId } = render(
      <input
        id="min-price-input"
        type="number"
        onChange={result.current.handleInputChange}
        value={result.current.values[0]}
      />,
    );

    act(() => {
      fireEvent.change(getByTestId('min-price-input'), {
        target: { valueAsNumber: 18, name: 'min' },
      });
    });

    expect(result.current.values).toEqual([18, 0]);
  });

  test('should change max value in state.', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    const { getByTestId } = render(
      <input
        id="max-price-input"
        type="number"
        onChange={result.current.handleInputChange}
        value={result.current.values[1]}
      />,
    );

    act(() => {
      fireEvent.change(getByTestId('max-price-input'), {
        target: { valueAsNumber: 222, name: 'max' },
      });
    });

    expect(result.current.values).toEqual([0, 222]);
  });

  test('should not change state in case value is not a number or less than 0.', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    const { getByTestId } = render(
      <input
        id="max-price-input"
        type="number"
        onChange={result.current.handleInputChange}
        value={result.current.values[1]}
      />,
    );

    act(() => {
      fireEvent.change(getByTestId('max-price-input'), {
        target: { valueAsNumber: -1, name: 'max' },
      });
    });

    expect(result.current.values).toEqual([0, 0]);
  });
});
