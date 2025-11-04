import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import type { SlotState } from '../../types/slotState';
import Slot from '../Slot/Slot';
import styles from './Column.module.css';

type ColumnProps = {
  columnNumber: number;
  slotsCount: number;
  isActive: boolean;
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
      isActive,
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

    const className = classNames(styles.column, {
      [styles.selected]: isActive && isSelected,
    });

    return (
      <div ref={ref} onClick={() => handleClick(columnNumber)} className={className}>
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
