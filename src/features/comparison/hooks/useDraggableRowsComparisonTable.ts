import { useRef, MouseEvent } from 'react';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import arrayMoveImmutable from '@src/common/utils/arrayMoveImmutable';
import { comparisonActions } from '../comparisonSlice';

const useDraggableRowsComparisonTable = () => {
  const dispatch = useAppDispatch();
  const table = useTypedSelector((state) => state.comparison.table);

  const toRowIdxRef = useRef<number | null>(null);

  const onDragEnter = (evt: MouseEvent) => {
    evt.preventDefault();

    const target = evt.currentTarget as HTMLElement;

    target.classList.add('draggable-row');

    toRowIdxRef.current = Number(target.dataset.rowId);
  };

  const onDragEnd = (evt: MouseEvent) => {
    evt.preventDefault();

    const target = evt.currentTarget as HTMLElement;

    target.classList.remove('draggable-row');

    const fromRowIdx = Number(target.dataset.rowId);

    const body = arrayMoveImmutable({
      array: table.body,
      fromIndex: fromRowIdx,
      toIndex: toRowIdxRef.current as number,
    });

    dispatch(comparisonActions.setComparisonTable({ header: table.header, body }));
  };

  const onDragLeave = (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement;
    target.classList.remove('draggable-row');
  };

  return {
    onDragEnter,
    onDragEnd,
    onDragLeave,
  };
};

export default useDraggableRowsComparisonTable;
