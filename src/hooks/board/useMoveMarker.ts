import { useCallback, type RefObject } from 'react';
import { useStore } from '../../stores/root.store';
import { useMoveElement } from '../shared/useMoveElement';

export const useMoveMarker = <T extends HTMLElement>(markerRef: RefObject<T | null>) => {
  const { boardStore } = useStore();
  const { moveElementByAxis } = useMoveElement(markerRef);

  const canMoveMarker = useCallback(
    (columnNumber: number) =>
      markerRef.current && boardStore.columnPositions[columnNumber] !== undefined,
    [boardStore.columnPositions, markerRef]
  );

  const moveMarker = useCallback(
    (columnNumber: number) => {
      if (canMoveMarker(columnNumber)) {
        moveElementByAxis(boardStore.columnPositions[columnNumber], 'X');
      }
    },
    [boardStore.columnPositions, canMoveMarker, moveElementByAxis]
  );

  return { moveMarker };
};
