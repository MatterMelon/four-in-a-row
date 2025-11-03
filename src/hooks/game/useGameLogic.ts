import { useCallback } from 'react';
import boardStore from '../../stores/board.store';
import gameStore from '../../stores/game.store';
import { useGameMoves } from './useGameMoves';
import { useWinCheck } from './useWinCheck';

export function useGameLogic() {
  const { makeMove } = useGameMoves();
  const { checkWinCondition } = useWinCheck();

  const switchPlayer = useCallback(() => {
    if (gameStore.activePlayer === 1) {
      gameStore.activePlayer = 2;
    } else {
      gameStore.activePlayer = 1;
    }
  }, []);

  const handlePlayerMove = useCallback(
    (columnNumber: number) => {
      const newBoardState = makeMove(columnNumber);
      if (!newBoardState) return;

      const winner = checkWinCondition(newBoardState);
      if (winner) {
        console.log(`Побелил игрок ${winner}`);
        gameStore.winner = winner;
        setTimeout(() => {
          gameStore.startNewGame(boardStore.rows, boardStore.cols);
        }, 1000);
        return;
      }

      switchPlayer();
    },
    [checkWinCondition, makeMove, switchPlayer]
  );

  return { handlePlayerMove };
}
