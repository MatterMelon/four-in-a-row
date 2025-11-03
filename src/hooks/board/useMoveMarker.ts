import { useCallback, type RefObject } from 'react';
import boardStore from '../../stores/board.store';
import { useMoveElement } from '../shared/useMoveElement';

export const useMoveMarker = <T extends HTMLElement>(markerRef: RefObject<T | null>) => {
  const { moveElementByAxis } = useMoveElement(markerRef);

  const canMoveMarker = useCallback(
    (columnNumber: number) =>
      markerRef.current && boardStore.columnPositions[columnNumber] !== undefined,
    [markerRef]
  );

  const moveMarker = useCallback(
    (columnNumber: number) => {
      if (canMoveMarker(columnNumber)) {
        moveElementByAxis(boardStore.columnPositions[columnNumber], 'X');
      }
    },
    [canMoveMarker, moveElementByAxis]
  );

  return { moveMarker };
};
