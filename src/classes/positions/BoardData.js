class BoardData {
  constructor(
    pieces_position_,
    total_black_pieces_,
    total_white_pieces_,
    black_long_castling_,
    black_short_castling_,
    white_long_castling_,
    white_short_castling_,
    last_movement_,
    movements_available_,
    next_player_,
    game_finished_,
    movements_
  ) {
    this.pieces_position = pieces_position_;
    this.total_black_pieces = total_black_pieces_;
    this.total_white_pieces = total_white_pieces_;
    this.black_long_castling = black_long_castling_;
    this.black_short_castling = black_short_castling_;
    this.white_long_castling = white_long_castling_;
    this.white_short_castling = white_short_castling_;
    this.last_movement = last_movement_;
    this.movements_available = movements_available_;
    this.next_player = next_player_;
    this.game_finished = game_finished_;
    this.movements = movements_;
  }

  print_info = () => {
    return `
current board: ${this.pieces_position}
total black pieces: ${this.total_black_pieces}
total white pieces: ${this.total_white_pieces}
total pieces: ${this.total_black_pieces+this.total_white_pieces}
black long castling: ${this.black_long_castling}
black short castling: ${this.black_short_castling}
white long castling: ${this.white_long_castling}
white short castling: ${this.white_short_castling}
most recent movement: ${this.last_movement}
total movements available: ${this.movements_available}
next_player: ${this.next_player}
`;
  };
}
export default BoardData;