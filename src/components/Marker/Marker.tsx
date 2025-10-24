import { forwardRef } from 'react';
import styles from './Marker.module.css';

const Marker = forwardRef<HTMLDivElement>((props, ref) => {
  return <div ref={ref} className={styles.marker}></div>;
});

export default Marker;
