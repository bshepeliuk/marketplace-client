import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { comparisonActions } from '@src/features/comparison/comparisonSlice';
import arrayMoveImmutable from '@common/utils/arrayMoveImmutable';
import useDraggableRowsComparisonTable from '@features/comparison/hooks/useDraggableRowsComparisonTable';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonTableMock } from '../../../mocks/data';

const setComparisonTableMock = jest.spyOn(comparisonActions, 'setComparisonTable');

describe('[HOOK]: useDraggableColumnComparisonTable', () => {
  const addClassToClassListMock = jest.fn();
  const removeClassFromClassListMock = jest.fn();

  const dragFromRowIdx = 1;
  const dragToRowIdx = 2;

  const dragEvtMock: any = {
    preventDefault: jest.fn(),
    currentTarget: {
      dataset: { rowId: dragFromRowIdx },
      classList: { contains: jest.fn(), remove: removeClassFromClassListMock, add: addClassToClassListMock },
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should have methods for dragging rows.', () => {
    const { result } = renderHook(() => useDraggableRowsComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(typeof result.current.onDragEnd).toBe('function');
    expect(typeof result.current.onDragEnter).toBe('function');
    expect(typeof result.current.onDragLeave).toBe('function');
  });

  test('should change index of rows on dragging.', () => {
    const { result } = renderHook(() => useDraggableRowsComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    act(() => {
      result.current.onDragEnter(dragEvtMock);
    });

    act(() => {
      result.current.onDragEnd({
        preventDefault: jest.fn(),
        currentTarget: {
          ...dragEvtMock.currentTarget,
          dataset: { rowId: dragToRowIdx },
        },
      } as any);
    });

    const body = arrayMoveImmutable({
      array: comparisonTableMock.body,
      fromIndex: dragFromRowIdx,
      toIndex: dragToRowIdx,
    });

    expect(addClassToClassListMock).toBeCalledWith('draggable-row');
    expect(setComparisonTableMock).toBeCalledWith({ header: comparisonTableMock.header, body });
    expect(removeClassFromClassListMock).toBeCalledWith('draggable-row');
  });

  test('should remove dragging className from classList', () => {
    const { result } = renderHook(() => useDraggableRowsComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    act(() => {
      result.current.onDragLeave({
        currentTarget: {
          ...dragEvtMock.currentTarget,
          dataset: { columnId: dragToRowIdx },
        },
      } as any);
    });

    expect(removeClassFromClassListMock).toBeCalledWith('draggable-row');
  });
});
