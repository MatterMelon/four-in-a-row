import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../stores/root.store';
import validator from '../../utils/validator';
import { useGameLogic } from '../game/useGameLogic';
import { useColumnNavigation } from './useColumnNavigation';
import useColumnPostions from './useColumnPositions';
import { useMoveMarker } from './useMoveMarker';

export function useBoard(rows: number, cols: number) {
  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  const { boardStore } = useStore();
  const { handlePlayerMove } = useGameLogic();
  const { moveMarker } = useMoveMarker(markerRef);
  const { handleColumnHover, handleColumnMouseOut, centerMarker } = useColumnNavigation(moveMarker);
  const { calculatePositions, updateColumnRefs } = useColumnPostions(
    boardRef,
    columnRefs,
    markerRef
  );

  const [steps, setSteps] = useState<number[]>([]);

  useEffect(() => {
    boardStore.initBoard(rows, cols);
  }, [boardStore, cols, rows]);

  useEffect(() => updateColumnRefs(), [cols, updateColumnRefs]);
  useEffect(() => centerMarker(), [centerMarker]);
  useEffect(() => {
    setTimeout(() => calculatePositions(), 0);
  }, [calculatePositions]);

  useEffect(() => {
    console.log(validator(steps));
  }, [steps]);

  const handleColumnClick = (columnNumber: number) => {
    handlePlayerMove(columnNumber);
    setSteps((prev) => [...prev, columnNumber]);
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
