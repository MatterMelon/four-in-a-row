import { useCallback } from 'react';
import boardStore from '../../stores/board.store';
import gameStore from '../../stores/game.store';
import { SlotState } from '../../types/slotState';

export function useGameMoves() {
  const makeMove = useCallback((columnNumber: number) => {
    const currentColumnState = boardStore.boardState[columnNumber];
    const firstNonEmptySlot = currentColumnState.findIndex((slot) => slot !== SlotState.EMPTY);
    const availableSlot =
      firstNonEmptySlot === -1 ? currentColumnState.length - 1 : firstNonEmptySlot - 1;

    if (availableSlot < 0) return null;

    const newColumnState = [...currentColumnState];
    newColumnState[availableSlot] =
      gameStore.activePlayer === 1 ? SlotState.PLAYER_ONE : SlotState.PLAYER_TWO;

    boardStore.updateColumn(columnNumber, newColumnState);

    const newBoardState = [...boardStore.boardState];
    newBoardState[columnNumber] = newColumnState;

    return newBoardState;
  }, []);

  return { makeMove };
}
