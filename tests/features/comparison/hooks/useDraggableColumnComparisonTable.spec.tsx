import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { comparisonActions } from '@src/features/comparison/comparisonSlice';
import arrayMoveImmutable from '@common/utils/arrayMoveImmutable';
import useDraggableColumnComparisonTable from '@features/comparison/hooks/useDraggableColumnComparisonTable';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonTableMock } from '../../../mocks/data';

const setComparisonTableMock = jest.spyOn(comparisonActions, 'setComparisonTable');

describe('[HOOK]: useDraggableColumnComparisonTable', () => {
  const addClassToClassListMock = jest.fn();
  const removeClassFromClassListMock = jest.fn();

  const dragFromColumnIdx = 1;
  const dragToColumnIdx = 2;

  const dragEvtMock: any = {
    currentTarget: {
      dataset: { columnId: dragFromColumnIdx },
      classList: { contains: jest.fn(), remove: removeClassFromClassListMock, add: addClassToClassListMock },
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should have methods for dragging columns.', () => {
    const { result } = renderHook(() => useDraggableColumnComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(typeof result.current.onDragEnd).toBe('function');
    expect(typeof result.current.onDragEnter).toBe('function');
    expect(typeof result.current.onDragLeave).toBe('function');
  });

  test('should change index of columns on dragging.', () => {
    const { result } = renderHook(() => useDraggableColumnComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    act(() => {
      result.current.onDragEnter(dragEvtMock);
    });

    act(() => {
      result.current.onDragEnd({
        currentTarget: {
          ...dragEvtMock.currentTarget,
          dataset: { columnId: dragToColumnIdx },
        },
      } as any);
    });

    const header = arrayMoveImmutable({
      array: comparisonTableMock.header,
      fromIndex: dragFromColumnIdx,
      toIndex: dragToColumnIdx,
    });

    const body = comparisonTableMock.body.map((row) => {
      return arrayMoveImmutable({
        array: row,
        fromIndex: dragFromColumnIdx,
        toIndex: dragToColumnIdx,
      });
    });

    expect(addClassToClassListMock).toBeCalledWith('draggable-column');
    expect(setComparisonTableMock).toBeCalledWith({ body, header });
    expect(removeClassFromClassListMock).toBeCalledWith('draggable-column');
  });

  test('should remove dragging className from classList', () => {
    const { result } = renderHook(() => useDraggableColumnComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    act(() => {
      result.current.onDragEnter(dragEvtMock);
    });

    act(() => {
      result.current.onDragLeave({
        currentTarget: {
          ...dragEvtMock.currentTarget,
          dataset: { columnId: dragToColumnIdx },
        },
      } as any);
    });

    expect(removeClassFromClassListMock).toBeCalledWith('draggable-column');
  });
});
