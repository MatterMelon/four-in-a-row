import classNames from 'classnames';
import { SlotState } from '../../types/slotState';
import styles from './Slot.module.css';

type SlotProps = {
  state: SlotState;
  handleSelect: VoidFunction;
  handleDeSelect: VoidFunction;
};

export default function Slot({ state = SlotState.EMPTY, handleSelect, handleDeSelect }: SlotProps) {
  const className = classNames(styles.slot, {
    [styles.p1]: state === SlotState.PLAYER_ONE,
    [styles.p2]: state === SlotState.PLAYER_TWO,
  });

  return <div className={className} onMouseEnter={handleSelect} onMouseLeave={handleDeSelect} />;
}
