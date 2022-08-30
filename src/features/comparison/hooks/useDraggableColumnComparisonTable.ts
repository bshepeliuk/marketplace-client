import { MouseEvent, useRef } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import arrayMoveImmutable from '@src/common/utils/arrayMoveImmutable';
import { comparisonActions } from '../comparisonSlice';

export const useDraggableColumnComparisonTable = () => {
  const dispatch = useAppDispatch();
  const table = useTypedSelector((state) => state.comparison.table);

  const toColumnIdxRef = useRef<number | null>(null);

  const onDragEnterColumn = (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement;

    target.classList.add('draggable-column');

    toColumnIdxRef.current = Number(target.dataset.columnId);
  };

  const onDragEndColumn = (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement;
    const fromColumnIdx = Number(target.dataset.columnId);

    target.classList.remove('draggable-column');

    const header = arrayMoveImmutable({
      array: table.header,
      fromIndex: fromColumnIdx,
      toIndex: toColumnIdxRef.current as number,
    });

    const body = table.body.map((row) => {
      return arrayMoveImmutable({
        array: row,
        fromIndex: fromColumnIdx,
        toIndex: toColumnIdxRef.current as number,
      });
    });

    dispatch(comparisonActions.setTable({ header, body }));
  };

  const onDragLeaveColumn = (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement;
    target.classList.remove('draggable-column');
  };

  return {
    onDragEnterColumn,
    onDragEndColumn,
    onDragLeaveColumn,
  };
};

export default useDraggableColumnComparisonTable;
