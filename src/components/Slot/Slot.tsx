import { SlotState } from '../../types/slotState';
import styles from './Slot.module.css';

type SlotProps = {
  state: SlotState;
  handleSelect: () => void;
  handleDeSelect: () => void;
};

export default function Slot({ state = SlotState.EMPTY, handleSelect, handleDeSelect }: SlotProps) {
  return (
    <div
      className={`${styles.slot} ${state === SlotState.PLAYER_ONE ? styles.p1 : ''} ${state === SlotState.PLAYER_TWO ? styles.p2 : ''}`}
      onMouseEnter={handleSelect}
      onMouseLeave={handleDeSelect}
    ></div>
  );
}
