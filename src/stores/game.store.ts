import { makeAutoObservable } from 'mobx';
import { GameState, type Coordinate } from '../types/gameTypes';
import type { RootStore } from './root.store';

export interface GameStoreState {
  gameState: GameState;
  activePlayer: number;
  winner: number | null;
  lastMove: Coordinate | null;
}

export default class GameStore {
  private _rootStore: RootStore;
  private _gameState: GameState = GameState.WAITING;
  private _activePlayer: number = 1;
  private _winner: number | null = null;
  private _lastMove: Coordinate | null = null;

  constructor(rootStore: RootStore, savedState?: Partial<GameStoreState>) {
    this._rootStore = rootStore;
    this.initializeFromSavedState(savedState);
    makeAutoObservable(this);
  }

  get gameState() {
    return this._gameState;
  }

  set gameState(state: GameState) {
    this._gameState = state;
  }

  get activePlayer() {
    return this._activePlayer;
  }

  set activePlayer(player: number) {
    switch (player) {
      case 1:
        this._activePlayer = 1;
        break;
      case 2:
        this._activePlayer = 2;
        break;
      default:
        console.error(`Unkonwn player ${player}`);
    }
  }

  get winner() {
    return this._winner;
  }

  set winner(player: number | null) {
    switch (player) {
      case null:
        this._winner = null;
        break;
      case 0:
        this._winner = player;
        break;
      case 1:
        this._winner = 1;
        break;
      case 2:
        this._winner = 2;
        break;
      default:
        console.error(`Unkonwn player ${player}`);
    }
  }

  get lastMove() {
    return this._lastMove;
  }

  set lastMove(position: Coordinate | null) {
    this._lastMove = position;
  }

  startNewGame(rows: number, cols: number) {
    this._rootStore.boardStore.initBoard(rows, cols);
    this.gameState = GameState.PENDING;
    this.winner = null;
    this.activePlayer = 1;
    this.lastMove = null;
  }

  resetGame() {
    this._gameState = GameState.WAITING;
    this._activePlayer = 1;
    this._winner = null;
    this._lastMove = null;
  }

  getPersistableData() {
    return {
      gameState: this._gameState,
      activePlayer: this._activePlayer,
      winner: this._winner,
      lastMove: this._lastMove,
    };
  }

  private initializeFromSavedState(savedState?: Partial<GameStoreState>) {
    if (savedState && this.isValidGameState(savedState)) {
      this._gameState = savedState.gameState ?? GameState.WAITING;
      this._activePlayer = savedState.activePlayer ?? 1;
      this._winner = savedState.winner ?? null;
      this._lastMove = savedState.lastMove ?? null;
      console.log('GameStore initialized from saved state');
    } else {
      this.resetGame();
      console.log('GameStore initialized with default values');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isValidGameState(state: any): state is Partial<GameStoreState> {
    if (!state) return false;

    const isValid =
      typeof state.gameState === 'number' &&
      Object.values(GameState).includes(state.gameState) &&
      typeof state.activePlayer === 'number' &&
      (typeof state.winner === 'number' || state.winner === null) &&
      typeof state.lastMove === 'object';

    if (!isValid) {
      console.warn('Invalid game state found in localStorage');
    }

    return isValid;
  }
}
