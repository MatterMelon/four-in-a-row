import { forwardRef } from 'react';
import styles from './Marker.module.css';

type MarkerProps = {
  isVisible: boolean;
};

const Marker = forwardRef<HTMLDivElement, MarkerProps>((props, ref) => {
  const { isVisible } = props;
  return (
    <div ref={ref} className={`${styles.marker} ${isVisible ? styles.marker_visible : ''}`}>
      <div className={styles.marker__body}></div>
    </div>
  );
});

export default Marker;
