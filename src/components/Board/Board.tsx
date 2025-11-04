import { observer } from 'mobx-react-lite';
import { useBoard } from '../../hooks/board/useBoard';
import { useStore } from '../../stores/root.store';
import { GameState } from '../../types/gameTypes';
import Column from '../Column/Column';
import Marker from '../Marker/Marker';
import styles from './Board.module.css';

type BoardProps = {
  rows: number;
  cols: number;
};

const Board = observer(({ rows, cols }: BoardProps) => {
  const { gameStore, boardStore } = useStore();
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
              key={i}
              isActive={gameStore.gameState === GameState.PENDING}
              columnNumber={i}
              slotsCount={rows}
              handleClick={handleColumnClick}
              handleHover={handleColumnHover}
              handleMouseOut={handleColumnMouseOut}
              columnSlotsState={boardStore.boardState[i]}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
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
