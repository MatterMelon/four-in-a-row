import { observer } from 'mobx-react-lite';
import { useBoard } from '../../hooks/board/useBoard';
import { useStore } from '../../stores/root.store';
import Column from '../Column/Column';
import Marker from '../Marker/Marker';
import styles from './Board.module.css';

type BoardProps = {
  rows: number;
  cols: number;
};

const Board = observer(({ rows, cols }: BoardProps) => {
  const { boardStore } = useStore();
  const {
    boardRef,
    columnRefs,
    markerRef,
    handleColumnHover,
    handleColumnMouseOut,
    handleColumnClick,
  } = useBoard(rows, cols);

  return (
    <>
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
