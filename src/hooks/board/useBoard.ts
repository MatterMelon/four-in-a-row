import { useEffect, useRef } from 'react';
import { useGameLogic } from '../game/useGameLogic';
import { useBoardState } from './useBoardState';
import { useColumnNavigation } from './useColumnNavigation';
import useColumnPostions from './useColumnPositions';
import { useMoveMarker } from './useMoveMarker';

export function useBoard(rows: number, cols: number) {
  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  const { boardState, updateColumn } = useBoardState(rows, cols);
  const { activePlayer, handlePlayerMove } = useGameLogic(boardState, updateColumn);

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
    handlePlayerMove(columnNumber);
  };

  return {
    activePlayer,

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
