import { useCallback } from 'react';
import { useStore } from '../../stores/root.store';
import { SlotState } from '../../types/slotState';

export function useGameMoves() {
  const { gameStore, boardStore } = useStore();
  const getFirstAvailableSlot = (columnState: SlotState[]) => {
    const firstNonEmptySlot = columnState.findIndex((slot) => slot !== SlotState.EMPTY);
    const availableSlot = firstNonEmptySlot === -1 ? columnState.length - 1 : firstNonEmptySlot - 1;
    return availableSlot;
  };

  const makeMove = useCallback(
    (columnNumber: number) => {
      const columnState = boardStore.boardState[columnNumber];
      const availableSlot = getFirstAvailableSlot(columnState);

      if (availableSlot < 0) return null;

      const newColumnState = [...columnState];
      newColumnState[availableSlot] =
        gameStore.activePlayer === 1 ? SlotState.PLAYER_ONE : SlotState.PLAYER_TWO;

      gameStore.lastMove = [boardStore.rows - availableSlot - 1, columnNumber];
      boardStore.updateColumn(columnNumber, newColumnState);

      const newBoardState = [...boardStore.boardState];
      newBoardState[columnNumber] = newColumnState;

      return newBoardState;
    },
    [boardStore, gameStore]
  );

  return { makeMove };
}
