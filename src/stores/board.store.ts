import { makeAutoObservable } from 'mobx';
import { SlotState } from '../types/slotState';

export interface BoardStoreState {
  boardState: SlotState[][];
  columnPositions: number[];
  activeColumn: number | null;
  rows: number;
  cols: number;
}

export default class BoardStore {
  private _boardState: SlotState[][] = [];
  private _columnPositions: number[] = [];
  private _activeColumn: number | null = null;
  private _rows: number = 0;
  private _cols: number = 0;

  constructor(savedState?: Partial<BoardStoreState>) {
    console.log('Board saved state:', savedState);
    this.initializeFromSavedState(savedState);
    makeAutoObservable(this);
  }

  get boardState() {
    return this._boardState;
  }

  get columnPositions() {
    return this._columnPositions;
  }

  set columnPositions(columnPositions: number[]) {
    this._columnPositions = columnPositions;
  }

  get activeColumn() {
    return this._activeColumn;
  }

  set activeColumn(columnNumber: number | null) {
    if (columnNumber && columnNumber < 0) {
      this._activeColumn = 0;
      return;
    }
    this._activeColumn = columnNumber;
  }

  get cols() {
    return this._cols;
  }

  get rows() {
    return this._rows;
  }

  get boardSize() {
    return { rows: this._rows, cols: this._cols };
  }

  initBoard = (rows: number, cols: number) => {
    this._rows = rows >= 0 ? rows : 0;
    this._cols = cols >= 0 ? cols : 0;
    this._boardState = Array(cols).fill(Array(rows).fill(SlotState.EMPTY));
  };

  updateColumn = (columnNumber: number, newColumnState: SlotState[]) => {
    const newBoardState = [...this._boardState];
    newBoardState[columnNumber] = [...newColumnState];
    this._boardState = newBoardState;
  };

  resetBoard = () => {
    this.initBoard(this._rows, this._cols);
  };

  getPersistableData() {
    return {
      boardState: this._boardState,
      columnPositions: this._columnPositions,
      activeColumn: this._activeColumn,
      rows: this._rows,
      cols: this._cols,
    };
  }

  private initializeFromSavedState(savedState?: Partial<BoardStoreState>) {
    if (savedState && this.isValidBoardState(savedState)) {
      console.log(savedState);
      this._boardState = savedState.boardState ?? [];
      this._columnPositions = savedState.columnPositions ?? [];
      this._activeColumn = null;
      this._rows = savedState.rows ?? 0;
      this._cols = savedState.cols ?? 0;
      console.log('BoardStore initialized from saved state');
    } else {
      this.resetBoard();
      console.log('BoardStore initialized with default values');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isValidBoardState(state: any): state is Partial<BoardStoreState> {
    if (!state) return false;

    const isValid =
      (state.boardState === undefined || Array.isArray(state.boardState)) &&
      (state.columnPositions === undefined || Array.isArray(state.columnPositions)) &&
      (state.activeColumn === undefined ||
        state.activeColumn === null ||
        typeof state.activeColumn === 'number') &&
      (state.rows === undefined || (typeof state.rows === 'number' && state.rows >= 0)) &&
      (state.cols === undefined || (typeof state.cols === 'number' && state.cols >= 0));

    if (!isValid) {
      console.warn('Invalid board state found in localStorage');
    }

    return isValid;
  }
}
