import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/root.store';
import { COLS, ROWS } from '../../types/gameTypes';
import Board from '../Board/Board';
import styles from './Game.module.css';

export const Game = observer(() => {
  const { gameStore, boardStore } = useStore();
  const { rows, cols } = boardStore.boardSize;

  return (
    <>
      <h1>Connect Four!</h1>
      <div className={styles.conrols}>
        <p>Ходит: Игрок {gameStore.activePlayer}</p>

        <button className={styles.restart} onClick={() => gameStore.startNewGame(rows, cols)}>
          Рестарт
        </button>
      </div>

      {(gameStore.winner === 0 || gameStore.winner) && (
        <div className={styles.winnerInfo}>
          {gameStore.winner === 0 ? 'Ничья!' : `Победил игрок ${gameStore.winner}!`}
        </div>
      )}

      <div className={styles.boardContainer}>
        <Board rows={ROWS} cols={COLS} />
      </div>
    </>
  );
});
