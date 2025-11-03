import { useEffect, useRef } from 'react';
import boardStore from '../../stores/board.store';
import { useGameLogic } from '../game/useGameLogic';
import { useColumnNavigation } from './useColumnNavigation';
import useColumnPostions from './useColumnPositions';
import { useMoveMarker } from './useMoveMarker';

export function useBoard(rows: number, cols: number) {
  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boardStore.initBoard(rows, cols);
  }, [cols, rows]);

  const { activePlayer, handlePlayerMove } = useGameLogic();
  const { calculatePositions, updateColumnRefs } = useColumnPostions(
    boardRef,
    columnRefs,
    markerRef
  );

  const { moveMarker } = useMoveMarker(markerRef);
  const { handleColumnHover, handleColumnMouseOut, centerMarker } = useColumnNavigation(moveMarker);

  useEffect(() => updateColumnRefs(), [cols, updateColumnRefs]);
  useEffect(() => {
    setTimeout(() => calculatePositions(), 0);
  }, [calculatePositions]);
  useEffect(() => centerMarker(), [centerMarker]);

  const handleColumnClick = (columnNumber: number) => {
    handlePlayerMove(columnNumber);
  };

  return {
    activePlayer,

    boardRef,
    columnRefs,
    markerRef,

    handleColumnHover,
    handleColumnMouseOut,
    handleColumnClick,
  };
}
