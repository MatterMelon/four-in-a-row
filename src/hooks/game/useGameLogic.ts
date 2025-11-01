import { useCallback, useState } from 'react';
import { SlotState } from '../../types/slotState';
import { useGameMoves } from './useGameMoves';
import { useWinCheck } from './useWinCheck';

export function useGameLogic(
  boardState: SlotState[][],
  updateColumn: (col: number, state: SlotState[]) => void
) {
  const [activePlayer, setActivePlayer] = useState(1);
  const { makeMove } = useGameMoves(boardState, activePlayer, updateColumn);
  const { checkWinCondition } = useWinCheck(boardState);

  const switchPlayer = useCallback(() => {
    if (activePlayer === 1) {
      setActivePlayer(2);
    } else {
      setActivePlayer(1);
    }
  }, [activePlayer]);

  const handlePlayerMove = useCallback(
    (columnNumber: number) => {
      const newBoardState = makeMove(columnNumber);
      if (!newBoardState) return;

      const winner = checkWinCondition(newBoardState);
      if (winner) {
        console.log(`Побелил игрок ${winner}`);
        return;
      }

      switchPlayer();
    },
    [checkWinCondition, makeMove, switchPlayer]
  );

  return { activePlayer, handlePlayerMove };
}
