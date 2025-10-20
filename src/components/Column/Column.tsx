import type { ReactElement } from 'react';
import Slot from '../Slot/Slot';

type ColumnProps = {
  slots: ReactElement<typeof Slot>[];
};

export default function Column({ slots }: ColumnProps) {
  return (
    <div>
      {slots.map((_, i) => (
        <Slot key={i} />
      ))}
    </div>
  );
}
