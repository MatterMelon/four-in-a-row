import { useState } from 'react';
import Column from '../Column/Column';
import styles from './Board.module.css';

const columnState1: SlotState[] = [0, 1, 0, 2, 0, 1];
const columnState2: SlotState[] = [2, 2, 0, 1, 2, 0];

export default function Board() {
  const [boardState, setBoardState] = useState<SlotState[][]>([
    columnState1,
    columnState2,
    columnState1,
    columnState2,
    columnState1,
    columnState2,
    columnState1,
  ]);

  const handleColumnClick = (columnNumber: number) => {
    console.log(`Colunmn ${columnNumber + 1} has been clicked!`);
    setBoardState((prevState) => {
      return prevState.map((col, index) => {
        if (index === columnNumber) {
          return Array.from({ length: 6 }).map(() => 0);
        }
        return col;
      });
    });
  };

  return (
    <div className={styles.board}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Column
          columnState={boardState[i]}
          key={i}
          columnNumber={i}
          slotsCount={6}
          handleClick={handleColumnClick}
        />
      ))}
    </div>
  );
}
