import Column from '../Column/Column';
import Slot from '../Slot/Slot';
import styles from './Board.module.css';

const slots = Array.from({ length: 6 }).map((_, i) => <Slot key={i} />);

export default function Board() {
  return (
    <div className={styles.board}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Column key={i} slots={slots} />
      ))}
      <Column slots={slots} />
    </div>
  );
}
