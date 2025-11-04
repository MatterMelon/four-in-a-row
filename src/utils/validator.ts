import type { Board, Coordinate, GameResult, Player } from '../types/gameTypes';
import checkWin from './checkWin';

export default function validator(moves: number[]) {
  const rows = 6;
  const cols = 7;

  const result: GameResult = {};
  const board: Board = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  const playerPositions: { [key in Player]: Coordinate[] } = {
    1: [],
    2: [],
  };

  result[`step_0`] = {
    player_1: [],
    player_2: [],
    board_state: 'waiting',
  };

  let gameEnded = false;

  for (let i = 0; i < moves.length; i++) {
    if (gameEnded) break;
    const currentPlayer: Player = i % 2 === 0 ? 1 : 2;
    const column = moves[i];

    let row = 0;
    for (let r = 0; r < rows; r++) {
      if (board[r][column] === null) {
        row = r;
        break;
      }
    }

    board[row][column] = currentPlayer;
    playerPositions[currentPlayer].push([row, column]);

    // Проверяем победу
    const winPositions = checkWin(board, row, column, currentPlayer);
    if (winPositions) {
      result[`step_${i + 1}`] = {
        player_1: [...playerPositions[1]],
        player_2: [...playerPositions[2]],
        board_state: 'win',
        winner: {
          who: currentPlayer,
          positions: winPositions,
        },
      };
      gameEnded = true;
      continue;
    }

    // Проверяем ничью
    if (isBoardFull(board)) {
      result[`step_${i + 1}`] = {
        player_1: [...playerPositions[1]],
        player_2: [...playerPositions[2]],
        board_state: 'draw',
      };
      gameEnded = true;
      continue;
    }

    // Продолжаем игру
    result[`step_${i + 1}`] = {
      player_1: [...playerPositions[1]],
      player_2: [...playerPositions[2]],
      board_state: 'pending',
    };
  }

  return result;
}

function isBoardFull(board: Board): boolean {
  return board[0].every((cell) => cell !== null);
}
