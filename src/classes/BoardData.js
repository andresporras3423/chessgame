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

  // method called after user click any cell in the board
  selectPiece = (cell) =>{
    // if there is no selected piece yet
    if(this.selectedPiece===null){
      // if the selected piece is from the color that has to move now
      if((this.whitePlaying && cell.piece[0]=="w") || (!this.whitePlaying && cell.piece[0]=="b")){
        this.selectedPiece = cell;
        this.selectedPiece.addColor("selected");
      }
    }
    //if click over the already selected piece then unselect the piece
    else if(cell === this.selectedPiece){
      this.selectedPiece.removeColor("selected");
      this.selectedPiece = null;
    }
    // if select a different piece from the same color of the already selected piece then unselect privous piece and select the new one
    else if(cell.piece[0]==this.selectedPiece.piece[0]){
      this.selectedPiece.removeColor("selected");
      this.selectedPiece = null;
      this.selectedPiece = cell;
      this.selectedPiece.addColor("selected");
    }
    //check if valid movement
    else if(this.validMovement(this.selectedPiece, cell)){
      //if valid movement the reove last movement color from last movement cells
      // update last movement cells 
      // remove selected color from the last selectedPiece
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
  }

  // this method is called after user click a second cell and after checking it doesnt click another piece of the same color
  // therefore by this point we already know the second cell selected is either an empty cell or fill by oponnnent color 
  validMovement = (cell1, cell2)=>{
  if(cell1.piece==="bn" || cell1.piece==="wn"){
    return this.validKnightMove(cell1, cell2);
  }
  if(cell1.piece==="bp"){
    return this.validBlackPawnMove(cell1, cell2);
  }
  if(cell1.piece==="wp"){
    return this.validWhitePawnMove(cell1, cell2);
  }
  if(cell1.piece==="wb" || cell1.piece==="bb"){
    return this.validBishopMove(cell1, cell2);
  }
  if(cell1.piece==="wr" || cell1.piece==="br"){
    return this.validRockMove(cell1, cell2);
  }
  return false;
  }

  validKnightMove = (cell1, cell2)=>{
    const knightMovements = ["12","1-2","21","2-1","-12","-1-2","-21","-2-1"]; // eight possible knight moves
    if(knightMovements.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`)) return true;
    return false;
  }

  validWhitePawnMove = (cell1, cell2)=>{
    const capture = ["1-1","11"];
    // if pawn move one cell ahead and the cell is empty
    if(cell2.piece=="" && `${cell1.y-cell2.y}${cell1.x-cell2.x}`==="10") return true;
    // if pawn move two cells ahead from its starting position, both cells ahead must be empty
    if(cell1.y===6 && cell2.piece==="" && `${cell1.y-cell2.y}${cell1.x-cell2.x}`==="20" && this.objectCells[5][cell1.x].piece==="") return true;
    // if capture on diagonal cells ahead, the ending cell must have a black piece
    if(cell2.piece[0]==="b" && capture.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`)) return true;
    // en passant move, white pawn is in the fifth row, if last movement was oponent pawn move to the left or right side of the selected pawn then it can take
    if(cell1.y===3 && capture.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`) && this.lastMovement2.piece==="bp" && this.lastMovement2.y===3 && this.lastMovement2.x===cell2.x && this.lastMovement1.y===1 && this.lastMovement1.x===cell2.x){
      //in this case, delete the pawn that moves in the previous move
      this.lastMovement2.piece="";
      return true;
    }
    // otherwise, is an invalid pawn movement and return false
    return false;
  }

  validBlackPawnMove = (cell1, cell2)=>{
    const capture = ["-1-1","-11"]; 
    // if pawn move one cell ahead and the cell is empty
    if(cell2.piece=="" && `${cell1.y-cell2.y}${cell1.x-cell2.x}`==="-10") return true;
    // if pawn move two cells ahead from its starting position, both cells ahead must be empty
    if(cell1.y===1 && cell2.piece=="" && `${cell1.y-cell2.y}${cell1.x-cell2.x}`==="-20" && this.objectCells[2][cell1.x].piece==="") return true;
    // if capture on diagonal cells ahead, the ending cell must have a white piece
    if(cell2.piece[0]=="w" && capture.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`)) return true;
    // en passant move, black pawn is in the fourth row, if last movement was oponent pawn move to the left or right side of the selected pawn then it can take
    if(cell1.y===4 && capture.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`) && this.lastMovement2.piece==="wp" && this.lastMovement2.y===4 && this.lastMovement2.x===cell2.x && this.lastMovement1.y===6 && this.lastMovement1.x===cell2.x){
      //in this case, delete the pawn that moves in the previous move
      this.lastMovement2.piece="";
      return true;
    }
    // otherwise, is an invalid pawn movement and return false
    return false;
  }

  validBishopMove = (cell1, cell2)=>{
    // return false if is not a diagonal move
    if(Math.abs(cell2.y-cell1.y)!==Math.abs(cell2.x-cell1.x)) return false;
    // check there is no pieces between cell1 and cell2
    let changeRow = Math.abs(cell2.y-cell1.y)/(cell2.y-cell1.y);
    let changeColumn = Math.abs(cell2.x-cell1.x)/(cell2.x-cell1.x);
    let row = cell1.y+changeRow;
    let column = cell1.x+changeColumn;
    while(row!=cell2.y){ // while checked cell is not the second cell
      //if a piece between cell1 and cell2 then invalid bishop movement
      if(this.objectCells[row][column].piece!=="") return false;
      row += changeRow;
      column += changeColumn;
    }
    return true;
  }
}

export default BoardData;
