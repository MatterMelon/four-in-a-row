import { useCallback } from 'react';
import boardStore from '../../stores/board.store';

export function useColumnNavigation(moveMarkerFunc: (column: number) => void) {
  const { cols } = boardStore.boardSize;

  const handleColumnHover = useCallback(
    (columnNumber: number) => {
      boardStore.activeColumn = columnNumber;
      moveMarkerFunc(columnNumber);
    },
    [moveMarkerFunc]
  );

  const handleColumnMouseOut = useCallback(() => {
    boardStore.activeColumn = null;
  }, []);

  const centerMarker = useCallback(() => {
    moveMarkerFunc(Math.ceil(cols / 2 - 1));
  }, [cols, moveMarkerFunc]);

  return {
    handleColumnHover,
    handleColumnMouseOut,
    centerMarker,
  };
}
