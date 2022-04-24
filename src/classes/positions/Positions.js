import Cell from "./Cell.js";

class Positions {
  constructor() {
    this.knight_movements = [
      new Cell(1, 2),
      new Cell(1, -2),
      new Cell(2, 1),
      new Cell(2, -1),
      new Cell(-1, 2),
      new Cell(-1, -2),
      new Cell(-2, 1),
      new Cell(-2, -1),
    ];

    this.king_movements = [
      new Cell(1, -1),
      new Cell(1, 0),
      new Cell(1, 1),
      new Cell(0, -1),
      new Cell(0, 1),
      new Cell(-1, -1),
      new Cell(-1, 0),
      new Cell(-1, 1),
    ];

    this.bishop_movements = [
      new Cell(1, 1),
      new Cell(1, -1),
      new Cell(-1, 1),
      new Cell(-1, -1),
    ];

    this.bishop_movements = [
      new Cell(1, 1),
      new Cell(1, -1),
      new Cell(-1, 1),
      new Cell(-1, -1),
    ];

    this.rock_movements = [
      new Cell(0, 1),
      new Cell(0, -1),
      new Cell(1, 0),
      new Cell(-1, 0),
    ];

    this.last_movement = ",,,,,,";
    this.black_long_castling = true;
    this.black_short_castling = true;
    this.white_long_castling = true;
    this.white_short_castling = true;
    this.next_black_queen = 2;
    this.next_black_rock = 3;
    this.next_black_bishop = 3;
    this.next_black_knight = 3;
    this.next_white_queen = 2;
    this.next_white_rock = 3;
    this.next_white_bishop = 3;
    this.next_white_knight = 3;
    this.cells = [...Array(8)].map((x) => (x = Array(8).fill("")));
    this.temp_cells = [...Array(8)].map((x) => (x = Array(8).fill("")));

    this.black_pieces = {
      br1: new Cell(0, 0),
      bn1: new Cell(0, 1),
      bb1: new Cell(0, 2),
      bq1: new Cell(0, 3),
      bk: new Cell(0, 4),
      bb2: new Cell(0, 5),
      bn2: new Cell(0, 6),
      br2: new Cell(0, 7),
      bp1: new Cell(1, 0),
      bp2: new Cell(1, 1),
      bp3: new Cell(1, 2),
      bp4: new Cell(1, 3),
      bp5: new Cell(1, 4),
      bp6: new Cell(1, 5),
      bp7: new Cell(1, 6),
      bp8: new Cell(1, 7),
    };

    this.white_pieces = {
      wp1: new Cell(6, 0),
      wp2: new Cell(6, 1),
      wp3: new Cell(6, 2),
      wp4: new Cell(6, 3),
      wp5: new Cell(6, 4),
      wp6: new Cell(6, 5),
      wp7: new Cell(6, 6),
      wp8: new Cell(6, 7),
      wr1: new Cell(7, 0),
      wn1: new Cell(7, 1),
      wb1: new Cell(7, 2),
      wq1: new Cell(7, 3),
      wk: new Cell(7, 4),
      wb2: new Cell(7, 5),
      wn2: new Cell(7, 6),
      wr2: new Cell(7, 7),
    };
  }

  white_king_attacked = (king) => {
    if (
      this.attacked_by_black_pawn(king.y, king.x) ||
      this.attacked_by_black_knight(king.y, king.x) ||
      this.attacked_by_black_king(king.y, king.x) ||
      this.attacked_by_black_in_diagonals(king.y, king.x) ||
      this.attacked_by_black_in_rowcolumns(king.y, king.x)
    ){
      return true;
    }
    return false;
  };

  black_king_attacked = (king) => {
    if (
      this.attacked_by_white_pawn(king.y, king.x) ||
      this.attacked_by_white_knight(king.y, king.x) ||
      this.attacked_by_white_king(king.y, king.x) ||
      this.attacked_by_white_in_diagonals(king.y, king.x) ||
      this.attacked_by_white_in_rowcolumns(king.y, king.x)
    ){
      return true;
    }
    return false;
  };

  available_black_moves = () => {
    let moves = this.available_black_king_moves();
    Object.entries(this.black_pieces).forEach(([piece, position]) => {
      if (piece.match(/^(bn)/))
       {
        moves = new Set([
          ...moves,
          ...this.available_black_knight_moves(piece, position),
        ]);
       }
      else if (piece.match(/^(bb)/))
        {
          moves = new Set([
            ...moves,
            ...this.available_black_bishop_moves(piece, position),
          ]);
        }
      else if (piece.match(/^(br)/))
        {
          moves = new Set([
            ...moves,
            ...this.available_black_rock_moves(piece, position),
          ]);
        }
      else if (piece.match(/^(bq)/))
        {
          moves = new Set([
            ...moves,
            ...this.available_black_queen_moves(piece, position),
          ]);
        }
      else if (piece.match(/^(bp)/))
        {
          moves = new Set([
            ...moves,
            ...this.available_black_pawn_moves(piece, position),
          ]);
        }
    });
    return moves;
  };

  available_black_king_moves = () => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    for(let index=0; index<this.king_movements.length;index++){
      let king_movement = this.king_movements[index];
      let n_cell = this.valid_position(
        king.y + king_movement.y,
        king.x + king_movement.x
      );
      if (n_cell == "" || n_cell.match(/^[w]/)) {
        this.temp_cells = JSON.parse(JSON.stringify(this.cells));
        this.temp_cells[king.y][king.x] = "";
        this.temp_cells[king.y + king_movement.y][king.x + king_movement.x] =
          "bk";
        if (
          !this.black_king_attacked(
            new Cell(king.y + king_movement.y, king.x + king_movement.x)
          )
        ) {
          available_movements.add(
            `bk,${king.y},${king.x},bk,${king.y + king_movement.y},${
              king.x + king_movement.x
            },${this.cells[king.y + king_movement.y][king.x + king_movement.x]}`
          );
        }
      }
    }
    this.temp_cells = JSON.parse(JSON.stringify(this.cells));
    const king_on_check = this.black_king_attacked(new Cell(king.y, king.x));
    if (
      this.black_long_castling &&
      this.cells[0][1] == "" &&
      this.cells[0][2] == "" &&
      this.cells[0][3] == "" &&
      !king_on_check &&
      !this.black_king_attacked(new Cell(king.y, king.x - 1)) &&
      !this.black_king_attacked(new Cell(king.y, king.x - 2))
    ) {
      available_movements.add(
        `bk,${king.y},${king.x},bk,${king.y},${king.x - 2},${
          this.cells[king.y][king.x - 2]
        }`
      );
    }
    if (
      this.black_short_castling &&
      this.cells[0][5] == "" &&
      this.cells[0][6] == "" &&
      !king_on_check &&
      !this.black_king_attacked(new Cell(king.y, king.x + 1)) &&
      !this.black_king_attacked(new Cell(king.y, king.x + 2))
    ) {
      available_movements.add(
        `bk,${king.y},${king.x},bk,${king.y},${king.x + 2},${
          this.cells[king.y][king.x + 2]
        }`
      );
    }
    return available_movements;
  };

  available_black_knight_moves = (piece, knight) => {
    const king = this.black_pieces["bk"];
    let available_movements = new Set();
    for(let index=0; index<this.knight_movements.length;index++){
      let knight_movement = this.knight_movements[index];
      let cell_ = this.valid_position(
        knight.y + knight_movement.y,
        knight.x + knight_movement.x
      );
      if (cell_ == "" || cell_[0] == "w") {
        this.temp_cells = JSON.parse(JSON.stringify(this.cells));
        this.temp_cells[knight.y][knight.x] = "";
        this.temp_cells[knight.y + knight_movement.y][
          knight.x + knight_movement.x
        ] = this.cells[knight.y][knight.x];
        if (!this.black_king_attacked(new Cell(king.y, king.x))) {
          available_movements.add(
            `${piece},${knight.y},${knight.x},${piece},${
              knight.y + knight_movement.y
            },${knight.x + knight_movement.x},${
              this.cells[knight.y + knight_movement.y][
                knight.x + knight_movement.x
              ]
            }`
          );
        }
      }
    }
    return available_movements;
  };

  available_black_pawn_moves = (piece, pawn) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    let cell_ = this.valid_position(pawn.y + 1, pawn.x);
    if (cell_ === "") {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y + 1][pawn.x] = this.cells[pawn.y][pawn.x];
      if (!this.black_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y + 1 < 7)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${pawn.x},`
          );
        else
          this.available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y + 1,
            pawn.x,
            available_movements
          );
      }
    }
    if (pawn.y === 1) {
      let cell_ = this.valid_position(pawn.y + 1, pawn.x);
      let cell2_ = this.valid_position(pawn.y + 2, pawn.x);
      if (cell_ === "" && cell2_ === "") {
        this.temp_cells = JSON.parse(JSON.stringify(this.cells));
        this.temp_cells[pawn.y][pawn.x] = "";
        this.temp_cells[pawn.y + 2][pawn.x] = this.cells[pawn.y][pawn.x];
        if (!this.black_king_attacked(new Cell(king.y, king.x)))
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 2},${pawn.x},`
          );
      }
    }
    cell_ = this.valid_position(pawn.y + 1, pawn.x + 1);
    if (cell_[0] === "w") {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y + 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!this.black_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y + 1 < 7)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${
              pawn.x + 1
            },${this.cells[pawn.y + 1][pawn.x + 1]}`
          );
        else
          this.available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y + 1,
            pawn.x + 1,
            available_movements
          );
      }
    }
    cell_ = this.valid_position(pawn.y + 1, pawn.x - 1);
    if (cell_[0] === "w") {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y + 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!this.black_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y + 1 < 7)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${
              pawn.x - 1
            },${this.cells[pawn.y + 1][pawn.x - 1]}`
          );
        else
          this.available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y + 1,
            pawn.x - 1,
            available_movements
          );
      }
    }
    if (this.can_black_en_passant(pawn.y, pawn.x + 1)) {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x + 1] = "";
      this.temp_cells[pawn.y + 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!this.black_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${pawn.x + 1},${
            this.cells[pawn.y][pawn.x + 1]
          }`
        );
    }
    if (this.can_black_en_passant(pawn.y, pawn.x - 1)) {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x - 1] = "";
      this.temp_cells[pawn.y + 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!this.black_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${pawn.x - 1},${
            this.cells[pawn.y][pawn.x - 1]
          }`
        );
    }
    return available_movements;
  };

  can_black_en_passant = (y, x) => {
    let move_details = this.last_movement.split(",");
    if (
      move_details[0].match(/^w/) &&
      parseInt(move_details[1]) == y + 2 &&
      parseInt(move_details[2]) == x &&
      move_details[3].match(/^w/) &&
      parseInt(move_details[4]) == y &&
      parseInt(move_details[5]) == x &&
      move_details[6] == ""
    )
      return true;
    return false;
  };

  can_white_en_passant = (y, x) => {
    let move_details = this.last_movement.split(",");
    if (
      move_details[0].match(/^b/) &&
      parseInt(move_details[1]) == y - 2 &&
      parseInt(move_details[2]) == x &&
      move_details[3].match(/^b/) &&
      parseInt(move_details[4]) == y &&
      parseInt(move_details[5]) == x &&
      move_details[6] == ""
    )
      return true;
    return false;
  };

  available_black_bishop_moves = (piece, bishop) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    for(let index=0; index<this.bishop_movements.length;index++){
      let bishop_movement = this.bishop_movements[index];
      let position_ = new Cell(bishop.y, bishop.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[bishop.y][bishop.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[bishop.y][bishop.x];
          if (!this.black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${bishop.y},${bishop.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    return available_movements;
  };

  available_black_rock_moves = (piece, rock) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    for(let index=0; index<this.bishop_movements.length;index++){
      let rock_movement = this.rock_movements[index];
      let position_ = new Cell(rock.y, rock.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[rock.y][rock.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[rock.y][rock.x];
          if (!this.black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${rock.y},${rock.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    return available_movements;
  };

  available_black_queen_moves = (piece, queen) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    for(let index=0; index<this.rock_movements.length;index++){
      let rock_movement = this.rock_movements[index];
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!this.black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    for(let index=0; index<this.bishop_movements.length;index++){
      let bishop_movement = this.bishop_movements[index];
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!this.black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    return available_movements;
  };

  available_white_moves = () => {
    let moves = this.available_white_king_moves();
    Object.entries(this.white_pieces).forEach(([piece, position]) => {
      if (piece.match(/^(wn)/))
        moves = new Set([
          ...moves,
          ...this.available_white_knight_moves(piece, position),
        ]);
      else if (piece.match(/^(wb)/))
        moves = new Set([
          ...moves,
          ...this.available_white_bishop_moves(piece, position),
        ]);
      else if (piece.match(/^(wr)/))
        moves = new Set([
          ...moves,
          ...this.available_white_rock_moves(piece, position),
        ]);
      else if (piece.match(/^(wq)/))
        moves = new Set([
          ...moves,
          ...this.available_white_queen_moves(piece, position),
        ]);
      else if (piece.match(/^(wp)/))
        moves = new Set([
          ...moves,
          ...this.available_white_pawn_moves(piece, position),
        ]);
    });
    return moves;
  };

  available_white_king_moves = () => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    for(let index=0; index<this.king_movements.length;index++){
      let king_movement = this.king_movements[index];
      let n_cell = this.valid_position(
        king.y + king_movement.y,
        king.x + king_movement.x
      );
      if (n_cell == "" || n_cell.match(/^[b]/)) {
        this.temp_cells = JSON.parse(JSON.stringify(this.cells));
        this.temp_cells[king.y][king.x] = "";
        this.temp_cells[king.y + king_movement.y][king.x + king_movement.x] =
          "wk";
        if (
          !this.white_king_attacked(
            new Cell(king.y + king_movement.y, king.x + king_movement.x)
          )
        )
          available_movements.add(
            `wk,${king.y},${king.x},wk,${king.y + king_movement.y},${
              king.x + king_movement.x
            },${this.cells[king.y + king_movement.y][king.x + king_movement.x]}`
          );
      }
    }
    this.temp_cells = JSON.parse(JSON.stringify(this.cells));
    if (
      this.white_long_castling &&
      this.cells[7][1] == "" &&
      this.cells[7][2] == "" &&
      this.cells[7][3] == "" &&
      !this.white_king_attacked(new Cell(king.y, king.x)) &&
      !this.white_king_attacked(new Cell(king.y, king.x - 1)) &&
      !this.white_king_attacked(new Cell(king.y, king.x - 2))
    )
      available_movements.add(
        `wk,${king.y},${king.x},wk,${king.y},${king.x - 2},${
          this.cells[king.y][king.x - 2]
        }`
      );
    if (
      this.white_short_castling &&
      this.cells[7][5] == "" &&
      this.cells[7][6] == "" &&
      !this.white_king_attacked(new Cell(king.y, king.x)) &&
      !this.white_king_attacked(new Cell(king.y, king.x + 1)) &&
      !this.white_king_attacked(new Cell(king.y, king.x + 2))
    )
      available_movements.add(
        `wk,${king.y},${king.x},wk,${king.y},${king.x + 2},${
          this.cells[king.y][king.x + 2]
        }`
      );
    return available_movements;
  };

  available_white_knight_moves = (piece, knight) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    for(let index=0; index<this.knight_movements.length;index++){
      let knight_movement = this.knight_movements[index];
      let cell_ = this.valid_position(
        knight.y + knight_movement.y,
        knight.x + knight_movement.x
      );
      if (cell_ == "" || cell_[0] == "b") {
        this.temp_cells = JSON.parse(JSON.stringify(this.cells));
        this.temp_cells[knight.y][knight.x] = "";
        this.temp_cells[knight.y + knight_movement.y][
          knight.x + knight_movement.x
        ] = this.cells[knight.y][knight.x];
        if (!this.white_king_attacked(new Cell(king.y, king.x)))
          available_movements.add(
            `${piece},${knight.y},${knight.x},${piece},${
              knight.y + knight_movement.y
            },${knight.x + knight_movement.x},${
              this.cells[knight.y + knight_movement.y][
                knight.x + knight_movement.x
              ]
            }`
          );
      }
    }
    return available_movements;
  };

  available_white_pawn_moves = (piece, pawn) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    let cell_ = this.valid_position(pawn.y - 1, pawn.x);
    if (cell_ == "") {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y - 1][pawn.x] = this.cells[pawn.y][pawn.x];
      if (!this.white_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y - 1 > 0)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${pawn.x},`
          );
        else
          this.available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y - 1,
            pawn.x,
            available_movements
          );
      }
    }
    if (pawn.y == 6) {
      let cell_ = this.valid_position(pawn.y - 1, pawn.x);
      let cell2_ = this.valid_position(pawn.y - 2, pawn.x);
      if (cell_ == "" && cell2_ == "") {
        this.temp_cells = JSON.parse(JSON.stringify(this.cells));
        this.temp_cells[pawn.y][pawn.x] = "";
        this.temp_cells[pawn.y - 2][pawn.x] = this.cells[pawn.y][pawn.x];
        if (!this.white_king_attacked(new Cell(king.y, king.x)))
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 2},${pawn.x},`
          );
      }
    }
    cell_ = this.valid_position(pawn.y - 1, pawn.x + 1);
    if (cell_.match(/^b/)) {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y - 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!this.white_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y - 1 > 0)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${
              pawn.x + 1
            },${this.cells[pawn.y - 1][pawn.x + 1]}`
          );
        else
          this.available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y - 1,
            pawn.x + 1,
            available_movements
          );
      }
    }
    cell_ = this.valid_position(pawn.y - 1, pawn.x - 1);
    if (cell_.match(/^b/)) {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y - 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!this.white_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y - 1 > 0)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${
              pawn.x - 1
            },${this.cells[pawn.y - 1][pawn.x - 1]}`
          );
        else
          this.available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y - 1,
            pawn.x - 1,
            available_movements
          );
      }
    }
    if (this.can_white_en_passant(pawn.y, pawn.x + 1)) {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x + 1] = "";
      this.temp_cells[pawn.y - 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!this.white_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${pawn.x + 1},${
            this.cells[pawn.y][pawn.x + 1]
          }`
        );
    }
    if (this.can_white_en_passant(pawn.y, pawn.x - 1)) {
      this.temp_cells = JSON.parse(JSON.stringify(this.cells));
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x - 1] = "";
      this.temp_cells[pawn.y - 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!this.white_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${pawn.x - 1},${
            this.cells[pawn.y][pawn.x - 1]
          }`
        );
    }
    return available_movements;
  };

  available_promotion_moves = (piece, y0, x0, y, x, available_movements) => {
    if (y == 0) {
      available_movements.add(
        `${piece},${y0},${x0},wq${this.next_white_queen},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},wr${this.next_white_rock},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},wb${this.next_white_bishop},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},wn${this.next_white_knight},${y},${x},${this.cells[y][x]}`
      );
    } else if (y == 7) {
      available_movements.add(
        `${piece},${y0},${x0},bq${this.next_black_queen},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},br${this.next_black_rock},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},bb${this.next_black_bishop},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},bn${this.next_black_knight},${y},${x},${this.cells[y][x]}`
      );
    }
  };

  available_white_bishop_moves = (piece, bishop) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    for(let index=0; index<this.bishop_movements.length;index++){
      let bishop_movement = this.bishop_movements[index];
      let position_ = new Cell(bishop.y, bishop.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[bishop.y][bishop.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[bishop.y][bishop.x];
          if (!this.white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${bishop.y},${bishop.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    return available_movements;
  };

  available_white_rock_moves = (piece, rock) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    for(let index=0; index<this.rock_movements.length;index++){
      let rock_movement = this.rock_movements[index];
      let position_ = new Cell(rock.y, rock.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[rock.y][rock.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[rock.y][rock.x];
          if (!this.white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${rock.y},${rock.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    return available_movements;
  };

  available_white_queen_moves = (piece, queen) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    for(let index=0; index<this.rock_movements.length;index++){
      let rock_movement = this.rock_movements[index];
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!this.white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    for(let index=0; index<this.bishop_movements.length;index++){
      let bishop_movement = this.bishop_movements[index];
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        let cell_ = this.valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = JSON.parse(JSON.stringify(this.cells));
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!this.white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    }
    return available_movements;
  };

  attacked_by_black_pawn = (y, x) => {
    if (
      this.valid_temp_piece(y - 1, x + 1, 0, 2) == "bp" ||
      this.valid_temp_piece(y - 1, x - 1, 0, 2) == "bp"
    ){
      return true;
    }
    return false;
  };

  attacked_by_black_knight = (y, x) => {
    if (
      this.valid_temp_piece(y - 2, x + 1, 0, 2) == "bn" ||
      this.valid_temp_piece(y - 2, x - 1, 0, 2) == "bn" ||
      this.valid_temp_piece(y + 2, x - 1, 0, 2) == "bn" ||
      this.valid_temp_piece(y + 2, x + 1, 0, 2) == "bn" ||
      this.valid_temp_piece(y - 1, x + 2, 0, 2) == "bn" ||
      this.valid_temp_piece(y - 1, x - 2, 0, 2) == "bn" ||
      this.valid_temp_piece(y + 1, x + 2, 0, 2) == "bn" ||
      this.valid_temp_piece(y + 1, x - 2, 0, 2) == "bn"
    ){
      return true;
    }
    return false;
  };

  attacked_by_black_king = (y, x) => {
    if (
      this.valid_temp_position(y - 1, x - 1) == "bk" ||
      this.valid_temp_position(y - 1, x) == "bk" ||
      this.valid_temp_position(y - 1, x + 1) == "bk" ||
      this.valid_temp_position(y, x - 1) == "bk" ||
      this.valid_temp_position(y, x + 1) == "bk" ||
      this.valid_temp_position(y + 1, x - 1) == "bk" ||
      this.valid_temp_position(y + 1, x) == "bk" ||
      this.valid_temp_position(y + 1, x + 1) == "bk"
    ){
      return true;
    }
    return false;
  };

  attacked_by_black_in_diagonals = (y, x) => {
    for(let index=0; index<this.bishop_movements.length;index++){
      let bishop_movement = this.bishop_movements[index];
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += bishop_movement.y;
        new_x += bishop_movement.x;
        if (
          this.valid_temp_piece(new_y, new_x, 0, 2) == "bq" ||
          this.valid_temp_piece(new_y, new_x, 0, 2) == "bb"
        ){
          return true;
        }
        else if (
          this.valid_temp_position(new_y, new_x) == "v" ||
          this.valid_temp_position(new_y, new_x) != ""
        ){
          break;
        }
      }
    }
    return false;
  };

  attacked_by_black_in_rowcolumns = (y, x) => {
    for(let index=0; index<this.rock_movements.length;index++){
      let rock_movement = this.rock_movements[index];
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += rock_movement.y;
        new_x += rock_movement.x;
        if (
          this.valid_temp_piece(new_y, new_x, 0, 2) == "bq" ||
          this.valid_temp_piece(new_y, new_x, 0, 2) == "br"
        )
          {
            return true;
          }
        else if (
          this.valid_temp_position(new_y, new_x) == "v" ||
          this.valid_temp_position(new_y, new_x) != ""
        )
          {
            break;
          }
      }
    }
    return false;
  };

  attacked_by_white_pawn = (y, x) => {
    if (
      this.valid_temp_piece(y + 1, x + 1, 0, 2) == "wp" ||
      this.valid_temp_piece(y + 1, x - 1, 0, 2) == "wp"
    )
      {
        return true;
      }
    return false;
  };

  attacked_by_white_knight = (y, x) => {
    if (
      this.valid_temp_piece(y - 2, x + 1, 0, 2) == "wn" ||
      this.valid_temp_piece(y - 2, x - 1, 0, 2) == "wn" ||
      this.valid_temp_piece(y + 2, x - 1, 0, 2) == "wn" ||
      this.valid_temp_piece(y + 2, x + 1, 0, 2) == "wn" ||
      this.valid_temp_piece(y - 1, x + 2, 0, 2) == "wn" ||
      this.valid_temp_piece(y - 1, x - 2, 0, 2) == "wn" ||
      this.valid_temp_piece(y + 1, x + 2, 0, 2) == "wn" ||
      this.valid_temp_piece(y + 1, x - 2, 0, 2) == "wn"
    )
      {
        return true;
      }
    return false;
  };

  attacked_by_white_king = (y, x) => {
    if (
      this.valid_temp_position(y - 1, x - 1) == "wk" ||
      this.valid_temp_position(y - 1, x) == "wk" ||
      this.valid_temp_position(y - 1, x + 1) == "wk" ||
      this.valid_temp_position(y, x - 1) == "wk" ||
      this.valid_temp_position(y, x + 1) == "wk" ||
      this.valid_temp_position(y + 1, x - 1) == "wk" ||
      this.valid_temp_position(y + 1, x) == "wk" ||
      this.valid_temp_position(y + 1, x + 1) == "wk"
    )
      {
        return true;
      }
    return false;
  };

  attacked_by_white_in_diagonals = (y, x) => {
    for(let index=0; index<this.bishop_movements.length;index++){
      let bishop_movement = this.bishop_movements[index];
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += bishop_movement.y;
        new_x += bishop_movement.x;
        if (
          this.valid_temp_piece(new_y, new_x, 0, 2) == "wq" ||
          this.valid_temp_piece(new_y, new_x, 0, 2) == "wb"
        )
          {
            return true;
          }
        else if (
          this.valid_temp_position(new_y, new_x) == "v" ||
          this.valid_temp_position(new_y, new_x) != ""
        )
          {
            break;
          }
      }
    }
    return false;
  };

  attacked_by_white_in_rowcolumns = (y, x) => {
    for(let index=0; index<this.rock_movements.length;index++){
      let rock_movement = this.rock_movements[index];
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += rock_movement.y;
        new_x += rock_movement.x;
        if (
          this.valid_temp_piece(new_y, new_x, 0, 2) == "wq" ||
          this.valid_temp_piece(new_y, new_x, 0, 2) == "wr"
        )
         {
          return true;
         }
        else if (
          this.valid_temp_position(new_y, new_x) == "v" ||
          this.valid_temp_position(new_y, new_x) != ""
        )
          {
            break;
          }
      }
    }
    return false;
  };

  valid_temp_position = (y, x) => {
    if (y >= 0 && y <= 7 && x >= 0 && x <= 7) return this.temp_cells[y][x];
    return "v";
  };

  valid_temp_piece = (y, x, init, length) => {
    if (!(y >= 0 && y <= 7 && x >= 0 && x <= 7)) return "v";
    return this.temp_cells[y][x].substring(init, init + length);
  };

  valid_position = (y, x) => {
    if (y >= 0 && y <= 7 && x >= 0 && x <= 7) return this.cells[y][x];
    return "v";
  };

  set_board = () => {
    this.cells = [...Array(8)].map((x) => (x = Array(8).fill("")));
    this.temp_cells = [...Array(8)].map((x) => (x = Array(8).fill("")));
    Object.entries(this.black_pieces).forEach(([piece, position]) => {
      this.cells[position.y][position.x] = piece;
    });
    Object.entries(this.white_pieces).forEach(([piece, position]) => {
      this.cells[position.y][position.x] = piece;
    });
  };

  update_board_details_after_white_move = (last_move) => {
    let selected_move_info = last_move.split(",");
    if (selected_move_info.at(-1) != ""){
      delete this.black_pieces[selected_move_info.at(-1)]; // unless change of position with no capture
    }
    if (selected_move_info[0] != selected_move_info[3]) {
      // if promotion
      delete this.white_pieces[selected_move_info[0]];
      this.white_pieces[selected_move_info[3]] = new Cell(
        parseInt(selected_move_info[4]),
        parseInt(selected_move_info[5])
      );
      this.update_white_promotion(selected_move_info[3]);
    } else if (selected_move_info.at(-1) == "castling") {
      if (selected_move_info[5] == "6")
        {
          this.white_pieces["wr2"] = new Cell(7, 5);
        }
      else this.white_pieces["wr1"] = new Cell(7, 3);
      this.white_short_castling = false;
      this.white_long_castling = false;
    }
    if (selected_move_info[0] == "wk") {
      // if last move was white king move
      this.white_short_castling = false;
      this.white_long_castling = false;
    } else if (selected_move_info[0] == "wr1")
      {
        this.white_long_castling = false; // else if selected last move is white rock 1 move
      }
    else if (selected_move_info[0] == "wr2")
      {
        this.white_short_castling = false; // else if selected last move is white rock 2 move
      }
    if (selected_move_info[4] == "0" && selected_move_info[5] == "0")
      {
        this.black_long_castling = false; // if last white move to the position of black rock 1
      }
    else if (selected_move_info[4] == "0" && selected_move_info[5] == "7")
      {
        this.black_short_castling = false; // else if last white move to the position of black rock 2
      }
    this.white_pieces[selected_move_info[3]] = new Cell(
      parseInt(selected_move_info[4]),
      parseInt(selected_move_info[5])
    );
    this.last_movement = last_move;
  };

  update_board_details_after_black_move = (last_move) => {
    let selected_move_info = last_move.split(",");
    if (selected_move_info.at(-1) != ""){
      delete this.white_pieces[selected_move_info.at(-1)]; // if not change of position with no capture
    }
    if (selected_move_info[0] != selected_move_info[3]) {
      // if promotion
      delete this.black_pieces[selected_move_info[0]];
      this.black_pieces[selected_move_info[3]] = new Cell(
        parseInt(selected_move_info[4]),
        parseInt(selected_move_info[5])
      );
      this.update_black_promotion(selected_move_info[3]);
    } else if (selected_move_info.at(-1) == "castling") {
      if (selected_move_info[5] == "6")
        {
          this.black_pieces["br2"] = new Cell(0, 5);
        }
      else this.black_pieces["br1"] = new Cell(0, 3);
      this.black_long_castling = false;
      this.black_short_castling = false;
    }
    if (selected_move_info[0] == "bk") {
      // if last move was black king move
      this.black_long_castling = false;
      this.black_short_castling = false;
    } else if (selected_move_info[0] == "br1")
      {
        this.black_long_castling = false; // else if selected last move is black rock 1 move
      }
    else if (selected_move_info[0] == "br2")
      {
        this.black_short_castling = false; // else if selected last move is black rock 2 move
      }
    if (selected_move_info[4] == "7" && selected_move_info[5] == "0")
      {
        this.white_long_castling = false; //if last black move to the position of white rock 1
      }
    else if (selected_move_info[4] == "7" && selected_move_info[5] == "7")
      {
        this.white_short_castling = false; // else if last black move to the position of white rock 2
      }
    this.black_pieces[selected_move_info[3]] = new Cell(
      parseInt(selected_move_info[4]),
      parseInt(selected_move_info[5])
    );
    this.last_movement = last_move;
  };

  update_white_promotion = (white_promoted) => {
    if (white_promoted.match(/^wq/)) this.next_white_queen += 1;
    else if (white_promoted.match(/^wr/)) this.next_white_rock += 1;
    else if (white_promoted.match(/^wb/)) this.next_white_bishop += 1;
    else this.next_white_knight += 1;
  };

  update_black_promotion = (black_promoted) => {
    if (black_promoted.match(/^bq/)) this.next_black_queen += 1;
    else if (black_promoted.match(/^br/)) this.next_black_rock += 1;
    else if (black_promoted.match(/^bb/)) this.next_black_bishop += 1;
    else this.next_black_knight += 1;
  };

  checkmate_still_possible = () => {
    if (this.can_black_checkmate() || this.can_white_checkmate()) return true;
    return false;
  };

  can_black_checkmate = () => {
    if (this.black_pieces.length == 1) return false;
    if (Object.keys(this.black_pieces).some((k) => k.match(/^bp/))) return true; //any pawn?
    if (Object.keys(this.black_pieces).some((k) => k.match(/^br/))) return true; //any rock?
    if (Object.keys(this.black_pieces).some((k) => k.match(/^bq/))) return true; //any queen?
    if (
      Object.keys(this.black_pieces).filter((k) => k.match(/^bn/)).length >= 3
    )
      return true; //at least 3 knights
    if (
      Object.keys(this.black_pieces).some((k) => k.match(/^bn/)) &&
      Object.keys(this.black_pieces).some((k) => k.match(/^bb/))
    )
      return true; // at least one knight and one bishop
    if (
      Object.entries(this.black_pieces).some(
        ([piece, position]) =>
          piece.match(/^bb/) && (position.x + position.y) % 2 === 0
      ) &&
      Object.entries(this.black_pieces).some(
        ([piece, position]) =>
          piece.match(/^bb/) && (position.x + position.y) % 2 === 1
      )
    )
      {
        return true; // at least one bishop in black cells and one bishop in white cells
      }
    return false;
  };
  can_white_checkmate = () => {
    if (this.white_pieces.length == 1) return false;
    if (Object.keys(this.white_pieces).some((k) => k.match(/^wp/))) return true; //any pawn?
    if (Object.keys(this.white_pieces).some((k) => k.match(/^wr/))) return true; //any rock?
    if (Object.keys(this.white_pieces).some((k) => k.match(/^wq/))) return true; //any queen?
    if (
      Object.keys(this.white_pieces).filter((k) => k.match(/^wn/)).length >= 3
    )
      {
        return true; //at least 3 knights
      }
    if (
      Object.keys(this.white_pieces).some((k) => k.match(/^wn/)) &&
      Object.keys(this.white_pieces).some((k) => k.match(/^wb/))
    )
      {
        return true; // at least one knight and one bishop
      }
    if (
      Object.entries(this.white_pieces).some(
        ([piece, position]) =>
          piece.match(/^wb/) && (position.x + position.y) % 2 === 0
      ) &&
      Object.entries(this.white_pieces).some(
        ([piece, position]) =>
          piece.match(/^wb/) && (position.x + position.y) % 2 === 1
      )
    )
      {
        return true; // at least one bishop in black cells and one bishop in white cells
      }
    return false;
  };
}
export default Positions;
