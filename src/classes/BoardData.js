import CellData from "./CellData.js";
// this class contains all the information about board situation
class BoardData {
  constructor(nPlayWithWhite=true) {
    this.whitePlaying = true; // indicates whether the current turn is for white or not
    this.playWithWhite = nPlayWithWhite; // indicates whether the human player is using white color or not
    // next four variables indicate if these castlings are still available or not
    this.blackLongCastling = true;
    this.blackShortCastling = true;
    this.whiteLongCastling = true;
    this.whiteShortCastling = true;
    // cells variable is used for getArrayCells() function to set the original position of the board
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
    if(!this.playWithWhite) this.turnBoard();
  }
  // initialize the value or arrayCells variable
  // arrayCells is a 2d array that contains the pointer to the 64 cells (which are object of the class CellData)
  // arrayCells is use to indicate the order of the cells, it is reversed to turn the board
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

  // initialize the value of objectCells variables
  // objectCells contains the 64 cells of the board (each one is a instance of the class CellData)
  // different to arrayCell, the order of the elements here is never changed
  // it is use to keep only one index logic for the board
  // Therefore, no matter if the board is turned, the blacks are still the first and second row and white the last two rows
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

  // turn board by reversing the order of cells in arrayCells
  // switch the playWithWhite value, to indicate that now the opposite color is the human color
  turnBoard = () => {
    let reverseCells = [];
    this.arrayCells.reverse().forEach((row) => {
      reverseCells.push(row.reverse());
    });
    this.arrayCells = reverseCells;
    this.playWithWhite = !this.playWithWhite;
  };
}

export default BoardData;
