import { useCallback } from 'react';
import boardStore from '../../stores/board.store';

export function useColumnNavigation(moveMarkerFunc: (column: number) => void) {
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
    moveMarkerFunc(Math.ceil(boardStore.cols / 2 - 1));
  }, [moveMarkerFunc]);

  return {
    handleColumnHover,
    handleColumnMouseOut,
    centerMarker,
  };
}
