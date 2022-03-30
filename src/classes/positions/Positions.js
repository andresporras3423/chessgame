const lodash = require("lodash");
import Cell from "./Cell";

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
    this.cells = [...Array(8)].map((x) => (x = Array(8).fill("x")));
    this.temp_cells = [...Array(8)].map((x) => (x = Array(8).fill("x")));

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
      wp1: Cell.new(6, 0),
      wp2: Cell.new(6, 1),
      wp3: Cell.new(6, 2),
      wp4: Cell.new(6, 3),
      wp5: Cell.new(6, 4),
      wp6: Cell.new(6, 5),
      wp7: Cell.new(6, 6),
      wp8: Cell.new(6, 7),
      wr1: Cell.new(7, 0),
      wn1: Cell.new(7, 1),
      wb1: Cell.new(7, 2),
      wq1: Cell.new(7, 3),
      wk: Cell.new(7, 4),
      wb2: Cell.new(7, 5),
      wn2: Cell.new(7, 6),
      wr2: Cell.new(7, 7),
    };
  }

  white_king_attacked = (king) => {
    if (
      attacked_by_black_pawn(king.y, king.x) ||
      attacked_by_black_knight(king.y, king.x) ||
      attacked_by_black_king(king.y, king.x) ||
      attacked_by_black_in_diagonals(king.y, king.x) ||
      attacked_by_black_in_rowcolumns(king.y, king.x)
    )
      return true;
    return false;
  };

  black_king_attacked = (king) => {
    if (
      attacked_by_white_pawn(king.y, king.x) ||
      attacked_by_white_knight(king.y, king.x) ||
      attacked_by_white_king(king.y, king.x) ||
      attacked_by_white_in_diagonals(king.y, king.x) ||
      attacked_by_white_in_rowcolumns(king.y, king.x)
    )
      return true;
    return false;
  };

  available_black_moves = () => {
    let moves = available_black_king_moves();
    this.black_pieces.forEach((piece, position) => {
      if (piece.match(/^(bn)/))
        moves = new Set([
          ...moves,
          ...available_black_knight_moves(piece, position),
        ]);
      else if (piece.match(/^(bb)/))
        moves = new Set([
          ...moves,
          ...available_black_bishop_moves(piece, position),
        ]);
      else if (piece.match(/^(br)/))
        moves = new Set([
          ...moves,
          ...available_black_rock_moves(piece, position),
        ]);
      else if (piece.match(/^(bq)/))
        moves = new Set([
          ...moves,
          ...available_black_queen_moves(piece, position),
        ]);
      else if ((piece = ~/^(bp)/))
        moves = new Set([
          ...moves,
          ...available_black_pawn_moves(piece, position),
        ]);
    });
  };

  available_black_king_moves = () => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    this.king_movements.forEach((king_movement) => {
      let n_cell = valid_position(
        king.y + king_movement.y,
        king.x + king_movement.x
      );
      if (n_cell == "" || n_cell.match(/^[w]/)) {
        this.temp_cells = lodash.cloneDeep(this.cells);
        this.temp_cells[king.y][king.x] = "";
        this.temp_cells[king.y + king_movement.y][king.x + king_movement.x] =
          "bk";
        if (
          !black_king_attacked(
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
    });
    this.temp_cells = lodash.cloneDeep(this.cells);
    const king_on_check = black_king_attacked(new Cell(king.y, king.x));
    if (
      this.black_long_castling &&
      this.cells[0][1] == "" &&
      this.cells[0][2] == "" &&
      this.cells[0][3] == "" &&
      !king_on_check &&
      !black_king_attacked(new Cell(king.y, king.x - 1)) &&
      !black_king_attacked(new Cell(king.y, king.x - 2))
    ) {
      available_movements.add(
        `bk,${king.y},${king.x},bk,${king.y},${king.x - 2},${
          cells[king.y][king.x - 2]
        }`
      );
    }
    if (
      this.black_short_castling &&
      this.cells[0][5] == "" &&
      this.cells[0][6] == "" &&
      !king_on_check &&
      !black_king_attacked(new Cell(king.y, king.x + 1)) &&
      !black_king_attacked(new Cell(king.y, king.x + 2))
    ) {
      available_movements.add(
        `bk,${king.y},${king.x},bk,${king.y},${king.x + 2},${
          cells[king.y][king.x + 2]
        }`
      );
    }
    return available_movements;
  };

  available_black_knight_moves = (piece, knight) => {
    const king = this.black_pieces["bk"];
    let available_movements = new Set();
    this.knight_movements.forEach((knight_movement) => {
      cell_ = valid_position(
        knight.y + knight_movement.y,
        knight.x + knight_movement.x
      );
      if (cell_ == "" || cell_[0] == "w") {
        this.temp_cells = lodash.cloneDeep(this.cells);
        this.temp_cells[knight.y][knight.x] = "";
        this.temp_cells[knight.y + knight_movement.y][
          knight.x + knight_movement.x
        ] = this.cells[knight.y][knight.x];
        if (!black_king_attacked(new Cell(king.y, king.x))) {
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
    });
    return available_movements;
  };

  available_black_pawn_moves = (piece, pawn) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    let cell_ = valid_position(pawn.y + 1, pawn.x);
    if (cell_ === "") {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y + 1][pawn.x] = this.cells[pawn.y][pawn.x];
      if (!black_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y + 1 < 7)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${pawn.x},`
          );
        else
          available_promotion_moves(
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
      let cell_ = valid_position(pawn.y + 1, pawn.x);
      let cell2_ = valid_position(pawn.y + 2, pawn.x);
      if (cell_ === "" && cell2_ === "") {
        this.temp_cells = lodash.cloneDeep(this.cells);
        this.temp_cells[pawn.y][pawn.x] = "";
        this.temp_cells[pawn.y + 2][pawn.x] = this.cells[pawn.y][pawn.x];
        if (!black_king_attacked(new Cell(king.y, king.x)))
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 2},${pawn.x},`
          );
      }
    }
    cell_ = valid_position(pawn.y + 1, pawn.x + 1);
    if (cell_[0] === "w") {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y + 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!black_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y + 1 < 7)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${
              pawn.x + 1
            },${this.cells[pawn.y + 1][pawn.x + 1]}`
          );
        else
          available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y + 1,
            pawn.x + 1,
            available_movements
          );
      }
    }
    cell_ = valid_position(pawn.y + 1, pawn.x - 1);
    if (cell_[0] === "w") {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y + 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!black_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y + 1 < 7)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${
              pawn.x - 1
            },${this.cells[pawn.y + 1][pawn.x - 1]}`
          );
        else
          available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y + 1,
            pawn.x - 1,
            available_movements
          );
      }
    }
    if (can_black_en_passant(pawn.y, pawn.x + 1)) {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x + 1] = "";
      this.temp_cells[pawn.y + 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!black_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${pawn.x + 1},${
            this.cells[pawn.y][pawn.x + 1]
          }`
        );
    }
    if (can_black_en_passant(pawn.y, pawn.x - 1)) {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x - 1] = "";
      this.temp_cells[pawn.y + 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (black_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y + 1},${pawn.x - 1},${
            this.cells[pawn.y][pawn.x - 1]
          }`
        );
    }
    return available_movements;
  };

  can_black_en_passant = (y, x) => {
    let move_details = this.last_movement.split(",", -1);
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
    let move_details = this.last_movement.split(",", -1);
    if (
      move_details[0].match(/^b/) &&
      parseInt(move_details[1]) == y - 2 &&
      parseInt(move_details[2]) == x &&
      move_details[3].match(/^b/) &&
      parseInt(move_details[4]) == y &&
      parseparseInt(move_details[5]) == x &&
      move_details[6] == ""
    )
      return true;
    return false;
  };

  available_black_bishop_moves = (piece, bishop) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    this.bishop_movements.forEach((bishop_movement) => {
      position_ = Cell.new(bishop.y, bishop.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[bishop.y][bishop.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[bishop.y][bishop.x];
          if (!black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${bishop.y},${bishop.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    return available_movements;
  };

  available_black_rock_moves = (piece, rock) => {
    let king = this.black_pieces["bk"];
    available_movements = new Set();
    this.rock_movements.forEach((rock_movement) => {
      position_ = new Cell(rock.y, rock.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[rock.y][rock.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[rock.y][rock.x];
          if (!black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${rock.y},${rock.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    return available_movements;
  };

  available_black_queen_moves = (piece, queen) => {
    let king = this.black_pieces["bk"];
    let available_movements = new Set();
    this.rock_movements.forEach((rock_movement) => {
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!black_king_attacked(Cell.new(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    this.bishop_movements.forEach((bishop_movement) => {
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        let cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^w/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!black_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    return available_movements;
  };

  available_white_moves = () => {
    let moves = available_white_king_moves();
    this.white_pieces.forEach((piece, position) => {
      if (piece.match(/^(wn)/))
        moves = new Set([
          ...moves,
          ...available_white_knight_moves(piece, position),
        ]);
      else if (piece.match(/^(wb)/))
        moves = new Set([
          ...moves,
          ...available_white_bishop_moves(piece, position),
        ]);
      else if (piece.match(/^(wr)/))
        moves = new Set([
          ...moves,
          ...available_white_rock_moves(piece, position),
        ]);
      else if (piece.match(/^(wq)/))
        moves = new Set([
          ...moves,
          ...available_white_queen_moves(piece, position),
        ]);
      else if (piece.match(/^(wp)/))
        moves = new Set([
          ...moves,
          ...available_white_pawn_moves(piece, position),
        ]);
    });
    return moves;
  };

  available_white_king_moves = () => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    this.king_movements.forEach((king_movement) => {
      let n_cell = valid_position(
        king.y + king_movement.y,
        king.x + king_movement.x
      );
      if (n_cell == "" || n_cell.match(/^[b]/)) {
        this.temp_cells = lodash.cloneDeep(this.cells);
        this.temp_cells[king.y][king.x] = "";
        this.temp_cells[king.y + king_movement.y][king.x + king_movement.x] =
          "wk";
        if (
          !white_king_attacked(
            new Cell(king.y + king_movement.y, king.x + king_movement.x)
          )
        )
          available_movements.add(
            `wk,${king.y},${king.x},wk,${king.y + king_movement.y},${
              king.x + king_movement.x
            },${this.cells[king.y + king_movement.y][king.x + king_movement.x]}`
          );
      }
    });
    this.temp_cells = lodash.cloneDeep(this.cells);
    if (
      this.white_long_castling &&
      this.cells[7][1] == "" &&
      this.cells[7][2] == "" &&
      this.cells[7][3] == "" &&
      !white_king_attacked(new Cell(king.y, king.x)) &&
      !white_king_attacked(new Cell(king.y, king.x - 1)) &&
      !white_king_attacked(new Cell(king.y, king.x - 2))
    )
      available_movements.add(
        `wk,${king.y},${king.x},wk,${king.y},${king.x - 2},${
          cells[king.y][king.x - 2]
        }`
      );
    if (
      this.white_short_castling &&
      this.cells[7][5] == "" &&
      this.cells[7][6] == "" &&
      !white_king_attacked(new Cell(king.y, king.x)) &&
      !white_king_attacked(new Cell(king.y, king.x + 1)) &&
      !white_king_attacked(new Cell(king.y, king.x + 2))
    )
      available_movements.add(
        `wk,${king.y},${king.x},wk,${king.y},${king.x + 2},${
          cells[king.y][king.x + 2]
        }`
      );
    return available_movements;
  };

  available_white_knight_moves = (piece, knight) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    this.knight_movements.forEach((knight_movement) => {
      let cell_ = valid_position(
        knight.y + knight_movement.y,
        knight.x + knight_movement.x
      );
      if (cell_ == "" || cell_[0] == "b")
        this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[knight.y][knight.x] = "";
      this.temp_cells[knight.y + knight_movement.y][
        knight.x + knight_movement.x
      ] = this.cells[knight.y][knight.x];
      if (!white_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${knight.y},${knight.x},${piece},${
            knight.y + knight_movement.y
          },${knight.x + knight_movement.x},${
            this.cells[knight.y + knight_movement.y][
              knight.x + knight_movement.x
            ]
          }`
        );
    });
    return available_movements;
  };

  available_white_pawn_moves = (piece, pawn) => {
    let king = white_pieces["wk"];
    let available_movements = new Set();
    let cell_ = valid_position(pawn.y - 1, pawn.x);
    if (cell_ == "") {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y - 1][pawn.x] = this.cells[pawn.y][pawn.x];
      if (!white_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y - 1 > 0)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${pawn.x},`
          );
        else
          available_promotion_moves(
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
      let cell_ = valid_position(pawn.y - 1, pawn.x);
      let cell2_ = valid_position(pawn.y - 1, pawn.x);
      if (cell_ == "" && cell2_ == "") {
        this.temp_cells = lodash.cloneDeep(this.cells);
        this.temp_cells[pawn.y][pawn.x] = "";
        this.temp_cells[pawn.y - 2][pawn.x] = this.cells[pawn.y][pawn.x];
        if (!white_king_attacked(new Cell(king.y, king.x)))
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 2},${pawn.x},`
          );
      }
    }
    cell_ = valid_position(pawn.y - 1, pawn.x + 1);
    if (cell_.match(/^b/)) {
      this.temp_cells = DeepClone.clone(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y - 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!white_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y - 1 > 0)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${
              pawn.x + 1
            },${this.cells[pawn.y - 1][pawn.x + 1]}`
          );
        else
          available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y - 1,
            pawn.x + 1,
            available_movements
          );
      }
    }
    cell_ = valid_position(pawn.y - 1, pawn.x - 1);
    if (cell_.match(/^b/)) {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y - 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!white_king_attacked(new Cell(king.y, king.x))) {
        if (pawn.y - 1 > 0)
          available_movements.add(
            `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${
              pawn.x - 1
            },${this.cells[pawn.y - 1][pawn.x - 1]}`
          );
        else
          available_promotion_moves(
            piece,
            pawn.y,
            pawn.x,
            pawn.y - 1,
            pawn.x - 1,
            available_movements
          );
      }
    }
    if (can_white_en_passant(pawn.y, pawn.x + 1)) {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x + 1] = "";
      this.temp_cells[pawn.y - 1][pawn.x + 1] = this.cells[pawn.y][pawn.x];
      if (!white_king_attacked(new Cell(king.y, king.x)))
        available_movements.add(
          `${piece},${pawn.y},${pawn.x},${piece},${pawn.y - 1},${pawn.x + 1},${
            this.cells[pawn.y][pawn.x + 1]
          }`
        );
    }
    if (can_white_en_passant(pawn.y, pawn.x - 1)) {
      this.temp_cells = lodash.cloneDeep(this.cells);
      this.temp_cells[pawn.y][pawn.x] = "";
      this.temp_cells[pawn.y][pawn.x - 1] = "";
      this.temp_cells[pawn.y - 1][pawn.x - 1] = this.cells[pawn.y][pawn.x];
      if (!white_king_attacked(new Cell(king.y, king.x)))
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
        `${piece},${y0},${x0},wq${next_white_queen},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},wr${next_white_rock},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},wb${next_white_bishop},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},wn${next_white_knight},${y},${x},${this.cells[y][x]}`
      );
    } else if (y == 7) {
      available_movements.add(
        `${piece},${y0},${x0},bq${next_black_queen},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},br${next_black_rock},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},bb${next_black_bishop},${y},${x},${this.cells[y][x]}`
      );
      available_movements.add(
        `${piece},${y0},${x0},bn${next_black_knight},${y},${x},${this.cells[y][x]}`
      );
    }
  };

  available_white_bishop_moves = (piece, bishop) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    this.bishop_movements.forEach((bishop_movement) => {
      position_ = new Cell(bishop.y, bishop.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[bishop.y][bishop.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[bishop.y][bishop.x];
          if (!white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${bishop.y},${bishop.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    return available_movements;
  };

  available_white_rock_moves = (piece, rock) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    this.rock_movements.forEach((rock_movement) => {
      let position_ = new Cell(rock.y, rock.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        let cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[rock.y][rock.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[rock.y][rock.x];
          if (!white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${rock.y},${rock.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    return available_movements;
  };

  available_white_queen_moves = (piece, queen) => {
    let king = this.white_pieces["wk"];
    let available_movements = new Set();
    this.rock_movements.forEach((rock_movement) => {
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += rock_movement.x;
        position_.y += rock_movement.y;
        let cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    this.bishop_movements.forEach((bishop_movement) => {
      let position_ = new Cell(queen.y, queen.x);
      while (true) {
        position_.x += bishop_movement.x;
        position_.y += bishop_movement.y;
        let cell_ = valid_position(position_.y, position_.x);
        if (cell_ == "" || cell_.match(/^b/)) {
          this.temp_cells = lodash.cloneDeep(this.cells);
          this.temp_cells[queen.y][queen.x] = "";
          this.temp_cells[position_.y][position_.x] =
            this.cells[queen.y][queen.x];
          if (!white_king_attacked(new Cell(king.y, king.x)))
            available_movements.add(
              `${piece},${queen.y},${queen.x},${piece},${position_.y},${
                position_.x
              },${this.cells[position_.y][position_.x]}`
            );
        }
        if (cell_ != "") break;
      }
    });
    return available_movements;
  };

  attacked_by_black_pawn = (y, x) => {
    if (
      valid_temp_piece(y - 1, x + 1, 0, 2) == "bp" ||
      valid_temp_piece(y - 1, x - 1, 0, 2) == "bp"
    )
      return true;
    return false;
  };

  attacked_by_black_knight = (y, x) => {
    if (
      valid_temp_piece(y - 2, x + 1, 0, 2) == "bn" ||
      valid_temp_piece(y - 2, x - 1, 0, 2) == "bn" ||
      valid_temp_piece(y + 2, x - 1, 0, 2) == "bn" ||
      valid_temp_piece(y + 2, x + 1, 0, 2) == "bn" ||
      valid_temp_piece(y - 1, x + 2, 0, 2) == "bn" ||
      valid_temp_piece(y - 1, x - 2, 0, 2) == "bn" ||
      valid_temp_piece(y + 1, x + 2, 0, 2) == "bn" ||
      valid_temp_piece(y + 1, x - 2, 0, 2) == "bn"
    )
      return true;
    return false;
  };

  attacked_by_black_king = (y, x) => {
    if (
      valid_temp_position(y - 1, x - 1) == "bk" ||
      valid_temp_position(y - 1, x) == "bk" ||
      valid_temp_position(y - 1, x + 1) == "bk" ||
      valid_temp_position(y, x - 1) == "bk" ||
      valid_temp_position(y, x + 1) == "bk" ||
      valid_temp_position(y + 1, x - 1) == "bk" ||
      valid_temp_position(y + 1, x) == "bk" ||
      valid_temp_position(y + 1, x + 1) == "bk"
    )
      return true;
    return false;
  };

  attacked_by_black_in_diagonals = (y, x) => {
    this.bishop_movements.forEach((bishop_movement) => {
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += bishop_movement.y;
        new_x += bishop_movement.x;
        if (
          valid_temp_piece(new_y, new_x, 0, 2) == "bq" ||
          valid_temp_piece(new_y, new_x, 0, 2) == "bb"
        )
          return true;
        else if (
          valid_temp_position(new_y, new_x) == "v" ||
          valid_temp_position(new_y, new_x) != ""
        )
          break;
      }
    });
    return false;
  };

  attacked_by_black_in_rowcolumns = (y, x) => {
    this.rock_movements.forEach((rock_movement) => {
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += rock_movement.y;
        new_x += rock_movement.x;
        if (
          valid_temp_piece(new_y, new_x, 0, 2) == "bq" ||
          valid_temp_piece(new_y, new_x, 0, 2) == "br"
        )
          return true;
        else if (
          valid_temp_position(new_y, new_x) == "v" ||
          valid_temp_position(new_y, new_x) != ""
        )
          break;
      }
    });
    return false;
  };

  attacked_by_white_pawn = (y, x) => {
    if (
      valid_temp_piece(y + 1, x + 1, 0, 2) == "wp" ||
      valid_temp_piece(y + 1, x - 1, 0, 2) == "wp"
    )
      return true;
    return false;
  };

  attacked_by_white_knight = (y, x) => {
    if (
      valid_temp_piece(y - 2, x + 1, 0, 2) == "wn" ||
      valid_temp_piece(y - 2, x - 1, 0, 2) == "wn" ||
      valid_temp_piece(y + 2, x - 1, 0, 2) == "wn" ||
      valid_temp_piece(y + 2, x + 1, 0, 2) == "wn" ||
      valid_temp_piece(y - 1, x + 2, 0, 2) == "wn" ||
      valid_temp_piece(y - 1, x - 2, 0, 2) == "wn" ||
      valid_temp_piece(y + 1, x + 2, 0, 2) == "wn" ||
      valid_temp_piece(y + 1, x - 2, 0, 2) == "wn"
    )
      return true;
    return false;
  };

  attacked_by_white_king = (y, x) => {
    if (
      valid_temp_position(y - 1, x - 1) == "wk" ||
      valid_temp_position(y - 1, x) == "wk" ||
      valid_temp_position(y - 1, x + 1) == "wk" ||
      valid_temp_position(y, x - 1) == "wk" ||
      valid_temp_position(y, x + 1) == "wk" ||
      valid_temp_position(y + 1, x - 1) == "wk" ||
      valid_temp_position(y + 1, x) == "wk" ||
      valid_temp_position(y + 1, x + 1) == "wk"
    )
      return true;
    return false;
  };

  attacked_by_white_in_diagonals = (y, x) => {
    this.bishop_movements.forEach((bishop_movement) => {
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += bishop_movement.y;
        new_x += bishop_movement.x;
        if (
          valid_temp_piece(new_y, new_x, 0, 2) == "wq" ||
          valid_temp_piece(new_y, new_x, 0, 2) == "wb"
        )
          return true;
        else if (
          valid_temp_position(new_y, new_x) == "v" ||
          valid_temp_position(new_y, new_x) != ""
        )
          break;
      }
    });
    return false;
  };

  attacked_by_white_in_rowcolumns = (y, x) => {
    this.rock_movements.forEach((rock_movement) => {
      let new_y = y;
      let new_x = x;
      while (true) {
        new_y += rock_movement.y;
        new_x += rock_movement.x;
        if (
          valid_temp_piece(new_y, new_x, 0, 2) == "wq" ||
          valid_temp_piece(new_y, new_x, 0, 2) == "wr"
        )
          return true;
        else if (
          valid_temp_position(new_y, new_x) == "v" ||
          valid_temp_position(new_y, new_x) != ""
        )
          break;
      }
    });
    return false;
  };

  valid_temp_position = (y, x) => {};

  valid_temp_piece = (y, x, init, length) => {};

  valid_position = (y, x) => {};

  set_initial_board = () => {};

  update_board_details_after_white_move = (last_move) => {};

  update_board_details_after_black_move = (last_move) => {};

  update_white_promotion = (white_promoted) => {};

  update_black_promotion = (black_promoted) => {};

  checkmate_still_possible = () => {};

  can_black_checkmate = () => {};

  can_white_checkmate = () => {};
}
export default Positions;

// def valid_temp_position(y, x)
//   return @temp_cells[y][x] if y >= 0 && y <= 7 && x >= 0 && x <= 7
//   "v"
// end

// def valid_temp_piece(y, x, init, length)
//   return "v" unless y >= 0 && y <= 7 && x >= 0 && x <= 7
//   @temp_cells[y][x][init...init + length]
// end

// def valid_position(y, x)
//   return @cells[y][x] if y >= 0 && y <= 7 && x >= 0 && x <= 7
//   "v"
// end

// def set_initial_board
//   @cells = Array.new(8).map { Array.new(8, "") }
//   @temp_cells = Array.new(8).map { Array.new(8, "") }
//   @black_pieces.each { |piece, position| @cells[position.y][position.x] = piece }
//   @white_pieces.each { |piece, position| @cells[position.y][position.x] = piece }
// end

// def update_board_details_after_white_move(last_move)
//   selected_move_info = last_move.split(",",-1)
//   @black_pieces.delete(selected_move_info.last) unless (selected_move_info.last == "") # unless change of position with no capture
//   if (selected_move_info[0] != selected_move_info[3]) # if promotion
//     @white_pieces.delete(selected_move_info.first)
//     @white_pieces[selected_move_info[3]] = Cell.new(selected_move_info[4].to_i, selected_move_info[5].to_i)
//     update_white_promotion(selected_move_info[3])
//   elsif (selected_move_info.last == "castling")
//     if (selected_move_info[5] == "6") then @white_pieces["wr2"] = Cell.new(7, 5) else @white_pieces["wr1"] = Cell.new(7, 3) end
//     @white_short_castling = false
//     @white_long_castling = false
//   end
//   if (selected_move_info.first == "wk") # if last move was white king move
//     @white_short_castling = false
//     @white_long_castling = false
//   elsif (selected_move_info.first == "wr1") # else if selected last move is white rock 1 move
//     @white_long_castling = false
//   elsif (selected_move_info.first == "wr2") # else if selected last move is white rock 2 move
//     @white_short_castling = false
//   end
//   if (selected_move_info[4] == "0" && selected_move_info[5] == "0") # if last white move to the position of black rock 1
//     @black_long_castling = false
//   elsif (selected_move_info[4] == "0" && selected_move_info[5] == "7") # else if last white move to the position of black rock 2
//     @black_short_castling = false
//   end
//   @white_pieces[selected_move_info[3]] = Cell.new(selected_move_info[4].to_i, selected_move_info[5].to_i)
//   @last_movement = last_move
// end

// def update_board_details_after_black_move(last_move)
//   selected_move_info = last_move.split(",",-1)
//   @white_pieces.delete(selected_move_info.last) unless (selected_move_info.last == "") # unless change of position with no capture
//   if (selected_move_info[0] != selected_move_info[3]) # if promotion
//     @black_pieces.delete(selected_move_info.first)
//     @black_pieces[selected_move_info[3]] = Cell.new(selected_move_info[4].to_i, selected_move_info[5].to_i)
//     update_black_promotion(selected_move_info[3])
//   elsif (selected_move_info.last == "castling")
//     if (selected_move_info[5] == "6") then @black_pieces["br2"] = Cell.new(0, 5) else @black_pieces["br1"] = Cell.new(0, 3) end
//     @black_long_castling = false
//     @black_short_castling = false
//   end
//   if (selected_move_info.first == "bk") # if last move was black king move
//     @black_long_castling = false
//     @black_short_castling = false
//   elsif (selected_move_info.first == "br1") # else if selected last move is black rock 1 move
//     @black_long_castling = false
//   elsif (selected_move_info.first == "br2") # else if selected last move is black rock 2 move
//     @black_short_castling = false
//   end
//   if (selected_move_info[4] == "7" && selected_move_info[5] == "0") # if last black move to the position of white rock 1
//     @white_long_castling = false
//   elsif (selected_move_info[4] == "7" && selected_move_info[5] == "7") # else if last black move to the position of white rock 2
//     @white_short_castling = false
//   end
//   @black_pieces[selected_move_info[3]] = Cell.new(selected_move_info[4].to_i, selected_move_info[5].to_i)
//   @last_movement = last_move
// end

// def update_white_promotion(white_promoted)
//   if (white_promoted =~ /^wq/) then @next_white_queen += 1 elsif (white_promoted =~ /^wr/) then @next_white_rock += 1 elsif (white_promoted =~ /^wb/) then @next_white_bishop += 1 else @next_white_knight += 1 end
// end

// def update_black_promotion(black_promoted)
//   if (black_promoted =~ /^bq/) then @next_black_queen += 1 elsif (black_promoted =~ /^br/) then @next_black_rock += 1 elsif (black_promoted =~ /^bb/) then @next_black_bishop += 1 else @next_black_knight += 1 end
// end

// def checkmate_still_possible?
//   return true if can_black_checkmate? || can_white_checkmate?
//   false
// end

// def can_black_checkmate?
//   return false if @black_pieces.length==1
//   return true if @black_pieces.keys.any?{|piece| piece=~/^bp/} #any pawn?
//   return true if @black_pieces.keys.any?{|piece| piece=~/^br/} #any rock?
//   return true if @black_pieces.keys.any?{|piece| piece=~/^bq/} #any queen?
//   return true if @black_pieces.keys.count{|piece| piece=~/^bn/}>=3 #at least 3 knights
//   return true if @black_pieces.keys.any?{|piece| piece=~/^bb/} && @black_pieces.keys.any?{|piece| piece=~/^bn/} # at least one knight and one bishop
//   return true if @black_pieces.any?{|piece, position| piece=~/^bb/ && (position.x+position.y).even?} && @black_pieces.any?{|piece, position| piece=~/^bb/ && (position.x+position.y).odd?} # at least one bishop in black cells and one bishop in white cells
//   false
// end

// def can_white_checkmate?
//   return false if @white_pieces.length==1
//   return true if @white_pieces.keys.any?{|piece| piece=~/^wp/} #any pawn?
//   return true if @white_pieces.keys.any?{|piece| piece=~/^wr/} #any rock?
//   return true if @white_pieces.keys.any?{|piece| piece=~/^wq/} #any queen?
//   return true if @white_pieces.keys.count{|piece| piece=~/^wn/}>=3 #at least 3 knights
//   return true if @white_pieces.keys.any?{|piece| piece=~/^wb/} && @white_pieces.keys.any?{|piece| piece=~/^wn/} # at least one knight and one bishop
//   return true if @white_pieces.any?{|piece, position| piece=~/^wb/ && (position.x+position.y).even?} && @white_pieces.any?{|piece, position| piece=~/^wb/ && (position.x+position.y).odd?} # at least one bishop in black cells and one bishop in white cells
//   false
// end
// end
