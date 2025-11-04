import type { SlotState } from './slotState';

export type Player = 1 | 2;
export type Board = (SlotState | null)[][];
export type Coordinate = [number, number];
export type BoardState = 'waiting' | 'pending' | 'win' | 'draw';

export interface WinnerInfo {
  who: Player;
  positions: Coordinate[];
}

export interface StepData {
  player_1: Coordinate[];
  player_2: Coordinate[];
  board_state: BoardState;
  winner?: WinnerInfo;
}

export interface GameResult {
  [step: string]: StepData;
}

export const GameState = {
  WAITING: 0,
  PENDING: 1,
  WIN: 2,
  DRAW: 3,
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];
