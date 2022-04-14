import CellData from "./CellData.js";

class BoardData {
  constructor() {
    this.blackLongCastling = true;
    this.blackShortCastling = true;
    this.whiteLongCastling = true;
    this.whiteShortCastling = true;
    this.cells = [
      ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
      ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
      ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
    ];
    this.arrayCells = this.getArrayCells();
    this.objectCells = this.getObjectCells();
  }

  getArrayCells = () => {
    const arr = [];
    this.cells.forEach((row, i) => {
      arr.push([]);
      row.forEach((cell, j) => {
        arr.at(-1).push(new CellData(i, j, cell));
      });
    });
    return arr;
  };

  getObjectCells = () => {
    const obj = [];
    this.arrayCells.forEach((row) => {
      obj.push([]);
      row.forEach((cellObject) => {
        obj.at(-1).push(cellObject);
      });
    });
    return obj;
  };
  turnBoard = () => {
    let reverseCells = [];
    this.arraycells.reverse().forEach((row) => {
      reverseCells.push(row.reverse());
    });
    this.arrayCells = reverseCells;
  };
}

export default BoardData;
