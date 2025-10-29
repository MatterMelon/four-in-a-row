export type SlotState = 'EMPTY' | 'PLAYER_ONE' | 'PLAYER_TWO';

export const SlotState = {
  EMPTY: 'EMPTY',
  PLAYER_ONE: 'PLAYER_ONE',
  PLAYER_TWO: 'PLAYER_TWO',
} as const;
