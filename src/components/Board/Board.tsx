import { useEffect, useRef, useState } from 'react';
import { useMoveMarker } from '../../hooks/useMoveMarker';
import Column from '../Column/Column';
import Marker from '../Marker/Marker';
import styles from './Board.module.css';

const initColumnState: SlotState[] = [0, 0, 0, 0, 0, 0];
type BoardProps = {
  rows: number;
  cols: number;
};

export default function Board({ rows, cols }: BoardProps) {
  const [boardState, setBoardState] = useState<SlotState[][]>(() =>
    new Array(cols).fill(initColumnState)
  );
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [columnPositions, setColumnPositions] = useState<number[]>([]);

  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement>(null);

  const { moveMarker } = useMoveMarker(markerRef, columnPositions);

  // Инициализация refs для колонок
  useEffect(() => {
    console.log('Init column refs...');
    columnRefs.current = columnRefs.current.slice(0, cols);
    console.log(`Column refs: ${columnRefs.current}`);
  }, [cols]);

  // Вычисление позиций при изменении размера окна
  useEffect(() => {
    const calculatePositions = () => {
      console.log('RECALCULATING');

      if (!boardRef.current || columnRefs.current.length === 0) {
        console.error(boardRef.current, columnRefs.current.length);
        return;
      }

      const boardRect = boardRef.current.getBoundingClientRect();
      const markerRect = markerRef.current?.getBoundingClientRect();
      const positions = columnRefs.current.map((column) => {
        if (!column || !markerRect) return 0;
        const columnRect = column.getBoundingClientRect();

        return columnRect.left - boardRect.left + columnRect.width / 2 - markerRect.width / 2;
      });

      setColumnPositions(positions);
    };

    calculatePositions();

    window.addEventListener('resize', calculatePositions);

    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  useEffect(() => {
    moveMarker(Math.ceil(cols / 2 - 1));
  }, [moveMarker, cols]);

  const handleColumnHover = (columnNumber: number) => {
    setActiveColumn(columnNumber);
    moveMarker(columnNumber);
  };

  const handleColumnMouseOut = () => {
    setActiveColumn(null);
  };

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
