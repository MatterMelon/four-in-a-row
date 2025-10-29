import { useCallback, type RefObject } from 'react';
import { useMoveElement } from '../shared/useMoveElement';

export const useMoveMarker = <T extends HTMLElement>(
  markerRef: RefObject<T | null>,
  columnPositions: number[]
) => {
  const { moveElementByAxis } = useMoveElement(markerRef);

  const canMoveMarker = useCallback(
    (columnNumber: number) => markerRef.current && columnPositions[columnNumber] !== undefined,
    [columnPositions, markerRef]
  );

  const moveMarker = useCallback(
    (columnNumber: number) => {
      if (canMoveMarker(columnNumber)) {
        moveElementByAxis(columnPositions[columnNumber], 'X');
      }
    },
    [canMoveMarker, columnPositions, moveElementByAxis]
  );

  return { moveMarker };
};
