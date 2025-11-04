import { useCallback } from 'react';
import { useStore } from '../../stores/root.store';
import { useGameMoves } from './useGameMoves';
import { useWinCheck } from './useWinCheck';

export function useGameLogic() {
  const { gameStore, boardStore } = useStore();
  const { makeMove } = useGameMoves();
  const { checkWinCondition } = useWinCheck();

  const switchPlayer = useCallback(() => {
    if (gameStore.activePlayer === 1) {
      gameStore.activePlayer = 2;
    } else {
      gameStore.activePlayer = 1;
    }
  }, [gameStore]);

  const handlePlayerMove = useCallback(
    (columnNumber: number) => {
      const newBoardState = makeMove(columnNumber);
      if (!newBoardState) return;

      const winner = checkWinCondition(newBoardState);
      if (winner !== null) {
        if (winner !== 0) {
          console.log(`Побелил игрок ${winner}!`);
        } else {
          console.log('Ничья!');
        }
        gameStore.winner = winner;
        setTimeout(() => {
          gameStore.startNewGame(boardStore.rows, boardStore.cols);
        }, 1000);
        return;
      }

      switchPlayer();
    },
    [boardStore.cols, boardStore.rows, checkWinCondition, gameStore, makeMove, switchPlayer]
  );

  return { handlePlayerMove };
}
