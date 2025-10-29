import { forwardRef, useState } from 'react';
import type { SlotState } from '../../types/slotState';
import Slot from '../Slot/Slot';
import styles from './Column.module.css';

type ColumnProps = {
  columnNumber: number;
  slotsCount: number;
  columnSlotsState: SlotState[];
  handleClick: (columnNumber: number) => void;
  handleHover: (columnNumber: number) => void;
  handleMouseOut: VoidFunction;
};

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      columnNumber,
      slotsCount,
      columnSlotsState: columnState,
      handleClick,
      handleHover,
      handleMouseOut,
    }: ColumnProps,
    ref
  ) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
      setIsSelected(true);
      handleHover(columnNumber);
    };

    const handleDeselect = () => {
      setIsSelected(false);
      handleMouseOut();
    };

    return (
      <div
        ref={ref}
        onClick={() => handleClick(columnNumber)}
        className={isSelected ? styles.selected : ''}
      >
        {Array.from({ length: slotsCount }).map((_, i) => (
          <Slot
            state={columnState[i]}
            handleSelect={handleSelect}
            handleDeSelect={handleDeselect}
            key={i}
          />
        ))}
      </div>
    );
  }
);

export default Column;
