import { useCallback, useState } from 'react';

export function useColumnNavigation(cols: number, moveMarkerFunc: (column: number) => void) {
  const [activeColumn, setActiveColumn] = useState<number | null>(null);

  const handleColumnHover = useCallback(
    (columnNumber: number) => {
      setActiveColumn(columnNumber);
      moveMarkerFunc(columnNumber);
    },
    [moveMarkerFunc]
  );

  const handleColumnMouseOut = useCallback(() => {
    setActiveColumn(null);
  }, []);

  const centerMarker = useCallback(() => {
    moveMarkerFunc(Math.ceil(cols / 2 - 1));
  }, [cols, moveMarkerFunc]);

  return {
    activeColumn,
    handleColumnHover,
    handleColumnMouseOut,
    centerMarker,
  };
}
