import classNames from 'classnames';
import { forwardRef } from 'react';
import styles from './Marker.module.css';

type MarkerProps = {
  isVisible: boolean;
};

const Marker = forwardRef<HTMLDivElement, MarkerProps>((props, ref) => {
  const { isVisible } = props;

  return (
    <div ref={ref} className={classNames(styles.marker, { [styles.marker_visible]: isVisible })}>
      <div className={styles.marker__body} />
    </div>
  );
});

export default Marker;
