export const SlotState = {
  EMPTY: 0,
  PLAYER_ONE: 1,
  PLAYER_TWO: 2,
} as const;

export type SlotState = (typeof SlotState)[keyof typeof SlotState];
