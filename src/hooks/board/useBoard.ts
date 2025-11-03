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

  const { handlePlayerMove } = useGameLogic();
  const { moveMarker } = useMoveMarker(markerRef);
  const { handleColumnHover, handleColumnMouseOut, centerMarker } = useColumnNavigation(moveMarker);
  const { calculatePositions, updateColumnRefs } = useColumnPostions(
    boardRef,
    columnRefs,
    markerRef
  );

  useEffect(() => {
    boardStore.initBoard(rows, cols);
  }, [cols, rows]);

  useEffect(() => updateColumnRefs(), [cols, updateColumnRefs]);
  useEffect(() => centerMarker(), [centerMarker]);
  useEffect(() => {
    setTimeout(() => calculatePositions(), 0);
  }, [calculatePositions]);

  const handleColumnClick = (columnNumber: number) => {
    handlePlayerMove(columnNumber);
  };

  return {
    boardRef,
    columnRefs,
    markerRef,

    handleColumnHover,
    handleColumnMouseOut,
    handleColumnClick,
  };
}
