import { useCallback, type RefObject } from 'react';

type MovementAxis = 'X' | 'Y';

export const useMoveElement = <T extends HTMLElement>(elementRef: RefObject<T | null>) => {
  const moveElementByAxis = useCallback(
    (distance: number, axis: MovementAxis = 'X') => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translate${axis}(${distance}px)`;
      }
    },
    [elementRef]
  );

  const moveElement = useCallback(
    (distanceX: number, distanceY: number) => {
      moveElementByAxis(distanceX, 'X');
      moveElementByAxis(distanceY, 'Y');
    },
    [moveElementByAxis]
  );

  return { moveElementByAxis, moveElement };
};
