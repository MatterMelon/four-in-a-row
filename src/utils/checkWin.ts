import type { Board, Coordinate } from '../types/gameTypes';

export default function checkWin(
  board: Board,
  row: number,
  col: number,
  player: number
): Coordinate[] | null {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    const positions: Coordinate[] = [[row, col]];

    for (let i = 1; i <= 3; i++) {
      const newRow = row + dr * i;
      const newCol = col + dc * i;
      if (isValidPosition(newRow, newCol) && board[newRow][newCol] === player) {
        positions.push([newRow, newCol]);
      } else {
        break;
      }
    }

    for (let i = 1; i <= 3; i++) {
      const newRow = row - dr * i;
      const newCol = col - dc * i;
      if (isValidPosition(newRow, newCol) && board[newRow][newCol] === player) {
        positions.unshift([newRow, newCol]);
      } else {
        break;
      }
    }

    if (positions.length >= 4) {
      return positions.slice(0, 4);
    }
  }

  return null;
}

export function isBoardFull(board: Board): boolean {
  return board[0].every((cell) => cell !== null);
}

function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < 6 && col >= 0 && col < 7;
}
