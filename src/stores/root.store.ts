import { reaction } from 'mobx';
import { createContext, useContext } from 'react';
import { debounce } from '../utils/debounce';
import { loadState, removeState, saveState } from '../utils/localStorage';
import BoardStore, { type BoardStoreState } from './board.store';
import GameStore, { type GameStoreState } from './game.store';

export interface RootStoreState {
  boardStore?: BoardStoreState;
  gameStore?: GameStoreState;
  version: number;
}

export class RootStore {
  gameStore: GameStore;
  boardStore: BoardStore;

  constructor() {
    const savedState = this.loadFromStorage();
    this.gameStore = new GameStore(this, savedState?.gameStore);
    this.boardStore = new BoardStore(savedState?.boardStore);

    const debouncedSave = debounce(() => {
      this.saveToStorage();
    }, 500);

    reaction(
      () => this.boardStore.boardState,
      () => debouncedSave()
    );
  }

  private getPersistableData() {
    return {
      boardStore: this.boardStore.getPersistableData?.(),
      gameStore: this.gameStore.getPersistableData?.(),
    };
  }

  private saveToStorage() {
    console.log('SAVED TO LOCAL STORAGE!');
    saveState('rootStore', this.getPersistableData());
  }

  private loadFromStorage() {
    return loadState<RootStoreState>('rootStore');
  }

  clearStorage() {
    removeState('rootStore');
  }
}

const rootStore = new RootStore();
export const StoreContext = createContext<RootStore>(rootStore);

export const useStore = () => useContext(StoreContext);
export default rootStore;
