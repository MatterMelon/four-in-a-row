import styles from './Slot.module.css';

type SlotProps = {
  state: SlotState;
  handleSelect: () => void;
  handleDeSelect: () => void;
};

export default function Slot({ state = 0, handleSelect, handleDeSelect }: SlotProps) {
  return (
    <div
      className={`${styles.slot} ${state === 1 ? styles.p1 : ''} ${state === 2 ? styles.p2 : ''}`}
      onMouseEnter={handleSelect}
      onMouseLeave={handleDeSelect}
    ></div>
  );
}
