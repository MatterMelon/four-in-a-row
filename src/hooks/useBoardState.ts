import { useState } from 'react';

export function useBoardState(rows: number, cols: number) {
  const [boardState, setBoardState] = useState<SlotState[][]>(() =>
    new Array(cols).fill(new Array(rows).fill(0))
  );

  const updateColumn = (columnNumber: number, newState: SlotState[]) => {
    setBoardState((prevState) =>
      prevState.map((col, index) => (index === columnNumber ? newState : col))
    );
  };

  return { boardState, updateColumn };
}
