import { useBoard } from '../../hooks/board/useBoard';
import Column from '../Column/Column';
import Marker from '../Marker/Marker';
import styles from './Board.module.css';

type BoardProps = {
  rows: number;
  cols: number;
};

export default function Board({ rows, cols }: BoardProps) {
  const {
    activePlayer,
    boardRef,
    columnRefs,
    markerRef,
    boardState,
    activeColumn,
    handleColumnHover,
    handleColumnMouseOut,
    handleColumnClick,
  } = useBoard(rows, cols);

  return (
    <>
      <p>Ходит: Игрок {activePlayer}</p>
      <Marker ref={markerRef} isVisible={activeColumn !== null} />

      <div ref={boardRef} className={styles.board}>
        {Array.from({ length: cols }).map((_, i) => (
          <Column
            ref={(el) => {
              columnRefs.current[i] = el;
            }}
            columnSlotsState={boardState[i]}
            key={i}
            columnNumber={i}
            slotsCount={rows}
            handleClick={handleColumnClick}
            handleHover={handleColumnHover}
            handleMouseOut={handleColumnMouseOut}
          />
        ))}
      </div>
    </>
  );
}
