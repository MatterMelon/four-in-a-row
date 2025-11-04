import { createContext, useContext } from 'react';
import BoardStore from './board.store';
import GameStore from './game.store';

export class RootStore {
  boardStore: BoardStore;
  gameStore: GameStore;

  constructor() {
    this.gameStore = new GameStore(this);
    this.boardStore = new BoardStore();
  }
}

const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = () => useContext(StoreContext);
export default rootStore;
