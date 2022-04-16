import CellData from "./CellData.js";
// this class contains all the information about board situation
class BoardData {
  constructor(nPlayWithWhite=true) {
    this.selectedPiece = null; // clicked piece by player to move
    this.whitePlaying = true; // indicates whether the current turn is for white or not
    this.playWithWhite = nPlayWithWhite; // indicates whether the human player is using white color or not
    // next four variables indicate if these castlings are still available or not
    this.blackLongCastling = true;
    this.blackShortCastling = true;
    this.whiteLongCastling = true;
    this.whiteShortCastling = true;
    this.lastMovement1 = null;
    this.lastMovement2 = null;
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

  selectPiece = (cell) =>{
    if(this.selectedPiece===null){
      if((this.whitePlaying && cell.piece[0]=="w") || (!this.whitePlaying && cell.piece[0]=="b")){
        this.selectedPiece = cell;
        this.selectedPiece.addColor("selected");
      }
    }
    else if(cell === this.selectedPiece){
      this.selectedPiece.removeColor("selected");
      this.selectedPiece = null;
    }
    else if(cell.piece[0]==this.selectedPiece.piece[0]){
      this.selectedPiece.removeColor("selected");
      this.selectedPiece = null;
      this.selectedPiece = cell;
      this.selectedPiece.addColor("selected");
    }
    else if(this.validMovement(this.selectedPiece, cell)){
      cell.piece = this.selectedPiece.piece;
      this.selectedPiece.piece="";
      if(this.lastMovement1!==null) this.lastMovement1.removeColor("last-move");
      if(this.lastMovement2!==null) this.lastMovement2.removeColor("last-move");
      this.lastMovement1= this.selectedPiece;
      this.lastMovement2 = cell;
      this.lastMovement1.addColor("last-move");
      this.lastMovement2.addColor("last-move");
      this.selectedPiece.removeColor("selected");
      this.selectedPiece=null;
      this.whitePlaying = !this.whitePlaying;
    }
    // samePiece check if you click the already selected piece
    // next two lines, unselect piece the currently selected piece
    // do nothing else if it was the same previous selected piece
  //otherwise select if valid selection
  }

  validMovement = (cell1, cell2)=>{
  if(cell1.piece==="bn" || cell1.piece==="wn"){
    if(this.validKnightMove(cell1, cell2)){
      return true;
    }
  }
  return false;
  }

  validKnightMove = (cell1, cell2)=>{
    const knightMovements = ["12","1-2","21","2-1","-12","-1-2","-21","-2-1"];
    if(knightMovements.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`)) return true;
    return false;
  }
}

export default BoardData;
