import { makeAutoObservable } from 'mobx';
import { SlotState } from '../types/slotState';

export default class BoardStore {
  private _boardState: SlotState[][] = [];
  private _columnPositions: number[] = [];
  private _activeColumn: number | null = null;
  private _rows: number = 0;
  private _cols: number = 0;

  constructor() {
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
}
