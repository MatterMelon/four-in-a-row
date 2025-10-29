import { useState } from 'react';
import { SlotState } from '../../types/slotState';

export function useBoardState(rows: number, cols: number) {
  const [boardState, setBoardState] = useState<SlotState[][]>(() =>
    new Array(cols).fill(new Array(rows).fill(SlotState.EMPTY))
  );

  const updateColumn = (columnNumber: number, newState: SlotState[]) => {
    setBoardState((prevState) =>
      prevState.map((col, index) => (index === columnNumber ? newState : col))
    );
  };

  return { boardState, updateColumn };
}
