import CellData from "./CellData.js";
import Positions from "./positions/Positions.js";
import Game from "./positions/Game.js";
import Cell from "./positions/Cell.js";
// this class contains all the information about board situation
class BoardData {
  constructor(nPlayWithWhite=true, nGameStarted="") {
    this.game = new Game();
    this.game.positions = new Positions();
    this.selectedPiece = null; // clicked piece by player to move
    this.whitePlaying = true; // indicates whether the current turn is for white or not
    this.playWithWhite = nPlayWithWhite; // indicates if board use white perspective or black perspective
    this.blackLongCastling = true;
    this.blackShortCastling = true;
    this.whiteLongCastling = true;
    this.whiteShortCastling = true;
    this.lastMovement1 = null;
    this.lastMovement2 = null;
    this.isPromotionMove = null;
    this.lastMovementCoordinates=""; // use the next structure piece1,y1,x1,piece2,y2,x2
    this.gameMessage=nGameStarted;
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
    this.arrayCells=[];
    this.objectCells=[];
    this.availableMoves=[];
    this.getArrayCells(); // order can be reversed
    this.getObjectCells(); // always keep original order
    this.getAllAvailableMoves();
    if(!this.playWithWhite) this.turnBoard();
  }

  getAllAvailableMoves = ()=>{
    // create global instance of class positions
    this.game.positions = new Positions();

    // update array positions.white_pieces and positions.black_pieces with the current state of the board
    this.updateCells();
    this.game.positions.black_long_castling = this.blackLongCastling;
    this.game.positions.black_short_castling = this.blackShortCastling;
    this.game.positions.white_long_castling = this.whiteLongCastling;
    this.game.positions.white_short_castling = this.whiteShortCastling;
    this.game.positions.last_movement = this.lastMovementCoordinates;
    this.game.positions.set_board();
    this.lastMovementCoordinates[0]==="w" ? this.game.add_recent_board("black") : this.game.add_recent_board("white");
    this.availableMoves = Array.from(this.game.board.movements).map((move)=>this.last_movement_reduced(move));
    this.updateGameStatus();
  }

  updateGameStatus = ()=>{
    if(this.game.board.game_finished){
      if(this.game.board.movements_available>0) this.gameMessage = "draw because of lack of pieces";
      else if(this.game.positions.last_movement[0]==="b" && this.game.positions.white_king_attacked(this.game.positions.white_pieces.wk)) this.gameMessage= "black wins";
      else if(this.game.positions.last_movement[0]==="w" && this.game.positions.black_king_attacked(this.game.positions.black_pieces.bk)) this.gameMessage= "white wins";
      else this.gameMessage = "draw because of stalemate";
    }
  }

  // update positions.white_pieces and positions.black_pieces using objectCells
  updateCells = ()=>{
    const list_index = {"bq": 1, "br": 1, "bb": 1, "bn": 1, "bp": 1, "wq": 1, "wr": 1, "wb": 1, "wn": 1, "wp": 1};
    this.game.positions.white_pieces={};
    this.game.positions.black_pieces={};
    this.objectCells.forEach((row, i)=>{
      row.forEach((cell,j)=>{
        if(cell.piece[0]==="b"){
          if(cell.piece==="bk"){
            this.game.positions.black_pieces[`bk`] = new Cell(i,j);
          }
          else{
            this.game.positions.black_pieces[`${cell.piece}${list_index[cell.piece]}`] = new Cell(i,j);
            list_index[cell.piece]++;
          }
        }
        else if(cell.piece[0]==="w"){
          if(cell.piece==="wk"){
            this.game.positions.white_pieces[`wk`] = new Cell(i,j);
          }
          else{
            this.game.positions.white_pieces[`${cell.piece}${list_index[cell.piece]}`] = new Cell(i,j);
            list_index[cell.piece]++;
          }
        }
      })
    });
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
  this.arrayCells = arr;
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
    this.objectCells = obj;
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
    // if select a different piece from the same color of the already selected piece then unselect previous piece and select the new one
    else if(cell.piece[0]==this.selectedPiece.piece[0]){
      this.selectedPiece.removeColor("selected");
      this.selectedPiece = null;
      this.selectedPiece = cell;
      this.selectedPiece.addColor("selected");
    }
    //check if valid movement
    else if(this.validMovement(this.selectedPiece, cell)){
      // if is it a promotion move then dont complete the move, return false to indicate in board component that this is a promotion move
      // return true to indicate this is a promotion move
      if(this.isPromotionMove) return true;
      // otherwise, complete the move to update board
      this.updateBoardAfterValidMove(cell, this.selectedPiece.piece);
    }
    // return false to indicate this is not a promotion move
    return false;
  }

  validMovement = (cell1, cell2)=>{
    // by default, after update the espected piece in the second selected cell will be the piece of the first cell
    let secondPiece = cell1.piece;
    // if promotion move, replace second piece with queen and check if it is between valid moves
    // if it is a valid promotion for queen then it will be for any other promotion
    if(cell1.piece==="wp" && cell2.y===0) secondPiece="wq";
    else if(cell1.piece==="bp" && cell2.y===7) secondPiece="bq";
    
    
    const newlastMove = `${cell1.piece},${cell1.y},${cell1.x},${secondPiece},${cell2.y},${cell2.x}`;
    const isValid = this.availableMoves.some((move)=> {
      return move===newlastMove
    });
    if(isValid){
      // next line only true if it is a valid promotion move
      if(secondPiece!==cell1.piece) this.isPromotionMove=true;
      else this.isPromotionMove=false;
    }
    return isValid;
  }

  check_white_en_passant = (cell1, cell2)=>{
    const capture = ["1-1","11"];
    if(cell1.y===3 && capture.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`) && this.lastMovement2.piece==="bp" && this.lastMovement2.y===3 && this.lastMovement2.x===cell2.x && this.lastMovement1.y===1 && this.lastMovement1.x===cell2.x){
      //in this case, delete the pawn that moves in the previous move
      this.lastMovement2.piece="";
    }
  }

  check_black_en_passant = (cell1, cell2)=>{
    const capture = ["-1-1","-11"];
    if(cell1.y===4 && capture.includes(`${cell1.y-cell2.y}${cell1.x-cell2.x}`) && this.lastMovement2.piece==="wp" && this.lastMovement2.y===4 && this.lastMovement2.x===cell2.x && this.lastMovement1.y===6 && this.lastMovement1.x===cell2.x){
      //in this case, delete the pawn that moves in the previous move
      this.lastMovement2.piece="";
    }
}

  check_castling = (cell1, cell2)=>{
      if(cell1.piece==="bk"){
        // check if movement is black long castling and it is still available
        if(cell2.y===0 && cell2.x===2){ 
          // move black rock to castling position
          this.objectCells[0][0].piece="";
          this.objectCells[0][3].piece="br";
        }
        // check if movement is black short castling and it is still available
        else if(cell2.y===0 && cell2.x===6){ 
          // move black rock to castling position
          this.objectCells[0][7].piece="";
          this.objectCells[0][5].piece="br";
        }
        // remove purple color in both black side corners
        this.objectCells[0][0].removeColor("castling-available");
        this.objectCells[0][7].removeColor("castling-available");
        // now both long and short castling are not possible moves
        this.blackLongCastling=false;
        this.blackShortCastling=false;
      }
    
      if(cell1.piece==="wk"){
        // check if movement is white long castling and it is still available
    if(cell1.piece==="wk" && cell2.y===7 && cell2.x===2){
      // move white rock to castling position
      this.objectCells[7][0].piece="";
      this.objectCells[7][3].piece="wr";
    }
    // check if movement is white short castling and is still available
    else if(cell1.piece==="wk" && cell2.y===7 && cell2.x===6){ 
      // move white rock to castling position
      this.objectCells[7][7].piece="";
      this.objectCells[7][5].piece="wr";
    }
    // remove purple color in both white side corners
    this.objectCells[7][0].removeColor("castling-available");
    this.objectCells[7][7].removeColor("castling-available");
    // now both long and short castling are not possible moves
    this.whiteLongCastling=false;
    this.whiteShortCastling=false;
      }
  }

  // method called when there is a valid black rock or white rock move
  update_available_castling = (cell1)=>{
    if(cell1.piece==="br" && cell1.y===0 && cell1.x===0){
      this.objectCells[0][0].removeColor("castling-available");
      this.blackLongCastling = false;
    }
    else if(cell1.piece==="br" && cell1.y===0 && cell1.x===7){
      this.objectCells[0][7].removeColor("castling-available");
      this.blackShortCastling = false;
    }
    else if(cell1.piece==="wr" && cell1.y===7 && cell1.x===0){
      this.objectCells[7][0].removeColor("castling-available");
      this.whiteLongCastling = false;
    }
    else if(cell1.piece==="wr" && cell1.y===7 && cell1.x===7){
      this.objectCells[7][7].removeColor("castling-available");
      this.whiteShortCastling = false;
    }
  }

  last_movement_reduced = (move) => {
    return move.split(",").slice(0,6).map(pos=> pos.substring(0,2)).join(",");
  };
  // cell is second clicked cell to choose destiny from piece to move
  updateBoardAfterValidMove = (cell, newPiece)=>{
    // move to corner has as keys the coordinates of board corners
    // the value is a function to update the castling of the corner to false
    const moveToCorner = {"00": ()=> this.blackLongCastling=false,"07": ()=> this.blackShortCastling=false,"70": ()=> this.whiteLongCastling=false,"77": ()=> this.whiteShortCastling=false};
    // if movement to a corner then update castling to that corner to false and remove castling color from the corner
    if(Object.keys(moveToCorner).includes(`${cell.y}${cell.x}`)){
      moveToCorner[`${cell.y}${cell.x}`]();
      this.objectCells[cell.y][cell.x].removeColor("castling-available");
    }
    if(this.selectedPiece.piece==="wr" || this.selectedPiece.piece==="br") this.update_available_castling(this.selectedPiece);
    else if(this.selectedPiece.piece==="wk" || this.selectedPiece.piece==="bk") this.check_castling(this.selectedPiece, cell);
    else if(this.selectedPiece.piece==="wp") this.check_white_en_passant(this.selectedPiece, cell);
    else if(this.selectedPiece.piece==="bp") this.check_black_en_passant(this.selectedPiece, cell);

    this.lastMovementCoordinates=`${this.selectedPiece.piece},${this.selectedPiece.y},${this.selectedPiece.x},${newPiece},${cell.y},${cell.x},`;
      //if valid movement the reove last movement color from last movement cells
      // update last movement cells 
      // remove selected color from the last selectedPiece
      cell.piece = newPiece;
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
      this.getAllAvailableMoves();
  }
}

export default BoardData;
