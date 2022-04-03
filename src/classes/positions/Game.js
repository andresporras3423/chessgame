import Positions from "./Positions.js";
import BoardData from "./BoardData.js";

class Game {
  constructor() {}

  start_game = () => {
    this.positions = new Positions();
    this.moves_done = 0;
    this.boardData = {};
    this.positions.set_board();
    this.next_white_move();
  };

  next_white_move = () => {
    let set_movements = this.positions.available_white_moves();
    let movements = Array.from(set_movements);
    if (this.is_it_game_over(movements.length)) return;
    this.add_recent_board(movements.length);
    this.print_last_board_info();
    let rnd = Math.floor(Math.random() * movements.length);
    let last_movement = movements[rnd];
    this.positions.update_board_details_after_white_move(last_movement);
    this.positions.set_board();
    this.next_black_move();
  };

  next_black_move = () => {
    let set_movements = this.positions.available_black_moves();
    let movements = Array.from(set_movements);
    if (this.is_it_game_over(movements.length)) return;
    this.add_recent_board(movements.length);
    this.print_last_board_info();
    let rnd = Math.floor(Math.random() * movements.length);
    let last_movement = movements[rnd];
    this.positions.update_board_details_after_black_move(last_movement);
    this.positions.set_board();
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

  is_it_game_over = (total_movements) => {
    if (
      total_movements == 0 ||
      Object.keys(this.positions.black_pieces).length +
      Object.keys(this.positions.white_pieces).length ==
        2 ||
      this.positions.checkmate_still_possible == false
    ) {
      if (total_movements == 0) this.add_recent_board(total_movements);
      return true;
    }
    return false;
  };

  add_recent_board = (total_movements) => {
    this.board = new BoardData(this.give_current_board(),
                             Object.keys(this.positions.black_pieces).length,
                             Object.keys(this.positions.white_pieces).length,
                             this.positions.black_long_castling,
                             this.positions.black_short_castling,
                             this.positions.white_long_castling,
                             this.positions.white_short_castling,
                             this.last_movement_reduced(),
                             total_movements,
                             [",", "b"].includes(this.last_movement_reduced()[0]) ? "white" : "black");
  };

  last_movement_reduced = () => {
    return this.positions.last_movement.split(",", -1).map(pos=> pos.substring(0,2)).join(",");
  };

  print_last_board_info = () => {
    this.moves_done++;
    console.log(`turn: ${Math.ceil(this.moves_done / 2)}`);
    console.log(this.board.print_info());
  };
}
export default Game;