import { useState } from 'react';
import Column from '../Column/Column';
import styles from './Board.module.css';

const initColumnState: SlotState[] = [0, 0, 0, 0, 0, 0];
type BoardProps = {
  rows: number;
  cols: number;
};

export default function Board({ rows, cols }: BoardProps) {
  const [boardState, setBoardState] = useState<SlotState[][]>(
    new Array(cols).fill(initColumnState)
  );

  const handleColumnClick = (columnNumber: number) => {
    console.log(`Colunmn ${columnNumber + 1} has been clicked!`);
    setBoardState((prevState) => {
      return prevState.map((col, index) => {
        if (index === columnNumber) {
          return new Array(rows).fill(0);
        }
        return col;
      });
    });
  };

  return (
    <div className={styles.board}>
      {Array.from({ length: cols }).map((_, i) => (
        <Column
          columnState={boardState[i]}
          key={i}
          columnNumber={i}
          slotsCount={rows}
          handleClick={handleColumnClick}
        />
      ))}
    </div>
  );
}
