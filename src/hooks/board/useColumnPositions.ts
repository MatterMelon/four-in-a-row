import { useCallback, type RefObject } from 'react';
import boardStore from '../../stores/board.store';
import useOnResize from '../shared/useOnResize';

export default function useColumnPostions<T extends HTMLElement>(
  boardRef: RefObject<T | null>,
  columnRefs: RefObject<(T | null)[]>,
  markerRef: RefObject<T | null>
) {
  const calculatePositions = useCallback(() => {
    if (!boardRef.current || columnRefs.current.length === 0) {
      console.error(boardRef.current, columnRefs.current.length);
      return;
    }

    const boardRect = boardRef.current.getBoundingClientRect();
    const markerRect = markerRef.current?.getBoundingClientRect();

    const positions = columnRefs.current.map((column) => {
      if (!column || !markerRect) return 0;
      const columnRect = column.getBoundingClientRect();

      return columnRect.left - boardRect.left + columnRect.width / 2 - markerRect.width / 2;
    });

    boardStore.columnPositions = positions;
  }, [boardRef, columnRefs, markerRef]);

  useOnResize(calculatePositions);

  const updateColumnRefs = useCallback(() => {
    columnRefs.current = columnRefs.current.slice(0, boardStore.cols);
  }, [columnRefs]);

  return {
    calculatePositions,
    updateColumnRefs,
  };
}
