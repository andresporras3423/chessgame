import Positions from "./Positions.js";
import BoardData from "./BoardData.js";

class Game {
  constructor() {}

  start_game = () => {
    this.positions = new Positions();
    this.moves_done = 0;
    this.boardData = {};
    this.positions.set_board();
  };

  next_start_game= ()=>{
    this.start_game();
    this.next_white_move();
  }

  white_move = ()=>{
    this.add_recent_board("white");
    if(this.board.game_finished) return false;
    this.print_last_board_info();
    this.moves_done++;
    let rnd = Math.floor(Math.random() * this.board.movements_available);
    let last_movement = this.board.movements[rnd];
    this.positions.update_board_details_after_white_move(last_movement);
    this.positions.set_board();
    return true;
  }

  next_white_move = () => {
    if(this.white_move()==false) return;
    this.next_black_move();
  };

  black_move = ()=>{
    this.add_recent_board("black");
    if(this.board.game_finished) return false;
    this.print_last_board_info();
    this.moves_done++;
    let rnd = Math.floor(Math.random() * this.board.movements_available);
    let last_movement = this.board.movements[rnd];
    this.positions.update_board_details_after_black_move(last_movement);
    this.positions.set_board();
    return true;
  }

  next_black_move = () => {
    if(this.black_move()==false) return;
    this.next_white_move();
  };

  give_current_board = () => {
    this.current_board = "";
    this.positions.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        this.current_board += cell.substring(0, 2);
        if (j < 7) this.current_board += ",";
      });
      if (i < 7) this.current_board += "*";
    });
    return this.current_board;
  };

  is_it_game_over = () => {
    if (
      this.board.movements_available == 0 ||
      Object.keys(this.positions.black_pieces).length +
      Object.keys(this.positions.white_pieces).length ==
        2 ||
      this.positions.checkmate_still_possible() == false
    ) {
      return true;
    }
    return false;
  };

  add_recent_board = (color) => {
    let set_movements = color=="white" ? this.positions.available_white_moves() : this.positions.available_black_moves();
    let movements = Array.from(set_movements);
    const total_movements = movements.length;
    this.board = new BoardData(this.give_current_board(),
                             Object.keys(this.positions.black_pieces).length,
                             Object.keys(this.positions.white_pieces).length,
                             this.positions.black_long_castling,
                             this.positions.black_short_castling,
                             this.positions.white_long_castling,
                             this.positions.white_short_castling,
                             this.last_movement_reduced(),
                             total_movements,
                             color,
                             false,
                             movements);
    const game_finished = this.is_it_game_over() ? true : false;
    this.board.game_finished = game_finished;
  };

  last_movement_reduced = () => {
    return this.positions.last_movement.split(",", -1).map(pos=> pos.substring(0,2)).join(",");
  };

  print_last_board_info = () => {
    console.log(`turn: ${Math.ceil(this.moves_done / 2)}`);
    console.log(this.board.print_info());
  };
}
export default Game;