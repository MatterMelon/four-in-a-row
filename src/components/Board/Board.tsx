import { useEffect, useRef } from 'react';
import { useBoardState } from '../../hooks/useBoardState';
import { useColumnNavigation } from '../../hooks/useColumnNavigation';
import useColumnPostions from '../../hooks/useColumnPositions';
import { useMoveMarker } from '../../hooks/useMoveMarker';
import Column from '../Column/Column';
import Marker from '../Marker/Marker';
import styles from './Board.module.css';

type BoardProps = {
  rows: number;
  cols: number;
};

export default function Board({ rows, cols }: BoardProps) {
  const { boardState } = useBoardState(rows, cols);

  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  const { columnPositions, calculatePositions, updateColumnRefs } = useColumnPostions(
    boardRef,
    columnRefs,
    markerRef,
    cols
  );

  const { moveMarker } = useMoveMarker(markerRef, columnPositions);

  const { activeColumn, handleColumnHover, handleColumnMouseOut, centerMarker } =
    useColumnNavigation(cols, moveMarker);

  useEffect(() => updateColumnRefs(), [updateColumnRefs]);
  useEffect(() => calculatePositions(), [calculatePositions]);
  useEffect(() => centerMarker, [centerMarker]);

  const handleColumnClick = (columnNumber: number) => {
    console.log(`Colunmn ${columnNumber + 1} has been clicked!`);
  };

  return (
    <>
      <Marker ref={markerRef} isVisible={activeColumn !== null} />

      <div ref={boardRef} className={styles.board}>
        {Array.from({ length: cols }).map((_, i) => (
          <Column
            ref={(el) => {
              columnRefs.current[i] = el;
            }}
            columnState={boardState[i]}
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
