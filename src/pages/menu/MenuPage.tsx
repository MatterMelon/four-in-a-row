import { useNavigate } from 'react-router';
import rootStore from '../../stores/root.store';
import { COLS, ROWS } from '../../types/gameTypes';
import styles from './Menu.module.css';

function MenuPage() {
  const navigate = useNavigate();
  const startGame = () => {
    rootStore.gameStore.startNewGame(ROWS, COLS);
    navigate('/game');
  };
  return (
    <div>
      <h1 className={styles.title}>Connect Four!</h1>
      <button className={styles.start} onClick={() => startGame()}>
        Начать игру
      </button>
    </div>
  );
}

export default MenuPage;
