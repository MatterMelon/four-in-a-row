import { useState } from 'react';
import Slot from '../Slot/Slot';
import styles from './Column.module.css';

type ColumnProps = {
  columnNumber: number;
  slotsCount: number;
  columnState: SlotState[];
  handleClick: (columnNumber: number) => void;
};

export default function Column({
  columnNumber,
  slotsCount,
  columnState,
  handleClick,
}: ColumnProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
  };

  const handleDeselect = () => {
    setIsSelected(false);
  };

  return (
    <div onClick={() => handleClick(columnNumber)} className={isSelected ? styles.selected : ''}>
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
