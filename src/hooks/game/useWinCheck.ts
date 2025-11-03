import { useCallback } from 'react';
import boardStore from '../../stores/board.store';
import type { SlotState } from '../../types/slotState';

// export function useWinCheck(boardState: SlotState[][]) {
export function useWinCheck() {
  const { rows, cols } = boardStore.boardSize;
  // const cols = boardState.length;
  // const rows = boardState[0].length;

  const checkVertical = useCallback(
    (boardState: SlotState[][]) => {
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row <= rows - 4; row++) {
          if (
            boardState[col][row] !== 0 &&
            boardState[col][row] === boardState[col][row + 1] &&
            boardState[col][row] === boardState[col][row + 2] &&
            boardState[col][row] === boardState[col][row + 3]
          ) {
            return boardState[col][row];
          }
        }
      }
    },
    [cols, rows]
  );

  const checkHorizontal = useCallback(
    (boardState: SlotState[][]) => {
      for (let col = 0; col <= cols - 4; col++) {
        for (let row = 0; row < rows; row++) {
          if (
            boardState[col][row] !== 0 &&
            boardState[col][row] === boardState[col + 1][row] &&
            boardState[col][row] === boardState[col + 2][row] &&
            boardState[col][row] === boardState[col + 3][row]
          ) {
            return boardState[col][row];
          }
        }
      }
    },
    [cols, rows]
  );

  const checkDiagonal = useCallback(
    (boardState: SlotState[][]) => {
      for (let col = 0; col <= cols - 4; col++) {
        for (let row = 0; row <= rows - 4; row++) {
          if (
            boardState[col][row] !== 0 &&
            boardState[col][row] === boardState[col + 1][row + 1] &&
            boardState[col][row] === boardState[col + 2][row + 2] &&
            boardState[col][row] === boardState[col + 3][row + 3]
          ) {
            return boardState[col][row];
          }
        }
      }

      for (let col = cols - 1; col >= 3; col--) {
        for (let row = 0; row <= rows - 4; row++) {
          if (
            boardState[col][row] !== 0 &&
            boardState[col][row] === boardState[col - 1][row + 1] &&
            boardState[col][row] === boardState[col - 2][row + 2] &&
            boardState[col][row] === boardState[col - 3][row + 3]
          ) {
            return boardState[col][row];
          }
        }
      }
    },
    [cols, rows]
  );

  const checkWinCondition = useCallback(
    (newBoardState: SlotState[][]) => {
      const reversedState = newBoardState.map((col) => [...col].reverse());

      return (
        checkVertical(reversedState) ||
        checkHorizontal(reversedState) ||
        checkDiagonal(reversedState)
      );
    },
    [checkVertical, checkHorizontal, checkDiagonal]
  );

  return { checkWinCondition };
}
