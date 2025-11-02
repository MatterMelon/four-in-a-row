import { useCallback } from 'react';
import { SlotState } from '../../types/slotState';

export function useGameMoves(
  boardState: SlotState[][],
  activePlayer: number,
  updateColumn: (col: number, state: SlotState[]) => void
) {
  const makeMove = useCallback(
    (columnNumber: number) => {
      const currentColumnState = boardState[columnNumber];
      const firstNonEmptySlot = currentColumnState.findIndex((slot) => slot !== SlotState.EMPTY);
      const availableSlot =
        firstNonEmptySlot === -1 ? currentColumnState.length - 1 : firstNonEmptySlot - 1;

      if (availableSlot < 0) return null;

      const newColumnState = [...currentColumnState];
      newColumnState[availableSlot] =
        activePlayer === 1 ? SlotState.PLAYER_ONE : SlotState.PLAYER_TWO;

      updateColumn(columnNumber, newColumnState);

      const newBoardState = [...boardState];
      newBoardState[columnNumber] = newColumnState;

      return newBoardState;
    },
    [activePlayer, boardState, updateColumn]
  );

  return { makeMove };
}
