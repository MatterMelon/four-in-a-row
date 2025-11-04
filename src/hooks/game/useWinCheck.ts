import { useCallback } from 'react';
import { useStore } from '../../stores/root.store';
import type { Board } from '../../types/gameTypes';
import checkWin, { isBoardFull } from '../../utils/checkWin';

export function useWinCheck() {
  const { gameStore } = useStore();
  const getConvertedBoard = (board: Board) => {
    const convertedBoard: Board = [];

    for (let row = 0; row < 6; row++) {
      convertedBoard[row] = [];
      for (let col = 0; col < 7; col++) {
        convertedBoard[row][col] = board[col][row];
      }
    }
    return convertedBoard.reverse();
  };

  const checkWinCondition = useCallback(
    (newBoardState: Board) => {
      if (!gameStore.lastMove) return null;
      const convertedBoard = getConvertedBoard(newBoardState);
      if (isBoardFull([...convertedBoard].reverse())) {
        alert('Full');
        return 0;
      }

      const [row, col] = gameStore.lastMove;

      const winningCells = checkWin(convertedBoard, row, col, gameStore.activePlayer);

      if (winningCells) {
        return gameStore.activePlayer;
      }

      return null;
    },
    [gameStore.activePlayer, gameStore.lastMove]
  );

  return { checkWinCondition };
}
