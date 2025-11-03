import { observer } from 'mobx-react-lite';
import { useBoard } from '../../hooks/board/useBoard';
import boardStore from '../../stores/board.store';
import Column from '../Column/Column';
import Marker from '../Marker/Marker';
import styles from './Board.module.css';

type BoardProps = {
  rows: number;
  cols: number;
};

const Board = observer(({ rows, cols }: BoardProps) => {
  const {
    activePlayer,
    boardRef,
    columnRefs,
    markerRef,
    handleColumnHover,
    handleColumnMouseOut,
    handleColumnClick,
  } = useBoard(rows, cols);

  return (
    <>
      <p>Ходит: Игрок {activePlayer}</p>
      <Marker ref={markerRef} isVisible={boardStore.activeColumn !== null} />

      {boardStore.boardState[0] ? (
        <div ref={boardRef} className={styles.board}>
          {Array.from({ length: cols }).map((_, i) => (
            <Column
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
              columnSlotsState={boardStore.boardState[i]}
              key={i}
              columnNumber={i}
              slotsCount={rows}
              handleClick={handleColumnClick}
              handleHover={handleColumnHover}
              handleMouseOut={handleColumnMouseOut}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
});

export default Board;
