export const GameState = {
  WAITING: 0,
  PENDING: 1,
  WIN: 2,
  DRAW: 3,
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];
