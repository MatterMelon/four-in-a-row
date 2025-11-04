import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/root.store';
import Board from '../Board/Board';

export const Game = observer(() => {
  const { gameStore } = useStore();
  return (
    <>
      <p>Ходит: Игрок {gameStore.activePlayer}</p>
      {gameStore.winner === 0 ? <h1>Ниья!</h1> : ''}
      {gameStore.winner ? <h1>Победил игрок {gameStore.winner}!</h1> : ''}

      <Board rows={6} cols={7} />
    </>
  );
});
