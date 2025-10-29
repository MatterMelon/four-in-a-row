import { useEffect, useRef } from 'react';
import { useBoardState } from './useBoardState';
import { useColumnNavigation } from './useColumnNavigation';
import useColumnPostions from './useColumnPositions';
import { useMoveMarker } from './useMoveMarker';

export function useBoard(rows: number, cols: number) {
  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  const { boardState } = useBoardState(rows, cols);

  const { columnPositions, calculatePositions, updateColumnRefs } = useColumnPostions(
    boardRef,
    columnRefs,
    markerRef,
    cols
  );

  const { moveMarker } = useMoveMarker(markerRef, columnPositions);
  const { activeColumn, handleColumnHover, handleColumnMouseOut, centerMarker } =
    useColumnNavigation(cols, moveMarker);

  useEffect(() => updateColumnRefs(), [cols, updateColumnRefs]);
  useEffect(() => calculatePositions(), [calculatePositions]);
  useEffect(() => centerMarker, [centerMarker]);

  const handleColumnClick = (columnNumber: number) => {
    console.log(`Colunmn ${columnNumber + 1} has been clicked!`);
  };

  return {
    boardRef,
    columnRefs,
    markerRef,

    boardState,
    activeColumn,

    handleColumnHover,
    handleColumnMouseOut,
    handleColumnClick,
  };
}
