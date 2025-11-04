import { useNavigate } from 'react-router';
import styles from './Menu.module.css';

function MenuPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className={styles.title}>Connect Four!</h1>
      <button className={styles.start} onClick={() => navigate('/game')}>
        Начать игру
      </button>
    </div>
  );
}

export default MenuPage;
