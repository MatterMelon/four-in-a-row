import { useCallback } from 'react';
import { useStore } from '../../stores/root.store';

export function useColumnNavigation(moveMarkerFunc: (column: number) => void) {
  const { boardStore } = useStore();
  const handleColumnHover = useCallback(
    (columnNumber: number) => {
      boardStore.activeColumn = columnNumber;
      moveMarkerFunc(columnNumber);
    },
    [boardStore, moveMarkerFunc]
  );

  const handleColumnMouseOut = useCallback(() => {
    boardStore.activeColumn = null;
  }, [boardStore]);

  const centerMarker = useCallback(() => {
    moveMarkerFunc(Math.ceil(boardStore.cols / 2 - 1));
  }, [boardStore.cols, moveMarkerFunc]);

  return {
    handleColumnHover,
    handleColumnMouseOut,
    centerMarker,
  };
}
