import { makeAutoObservable } from 'mobx';
import { GameState } from '../types/gameTypes';
import boardStore from './board.store';

class BoardStore {
  private _gameState: GameState = GameState.WAITING;
  private _activePlayer: number = 1;
  private _winner: number | null = null;

  constructor() {
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

  startNewGame(rows: number, cols: number) {
    boardStore.initBoard(rows, cols);
    this.gameState = GameState.PENDING;
    this.winner = null;
    this.activePlayer = 1;
  }
}

export default new BoardStore();
