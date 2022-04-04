import Cell from './../classes/positions/Cell';
import Positions from './../classes/positions/Positions';
let positions = {};
const no_castling = ()=>{
  no_white_castling();
  no_black_castling();
}
const no_white_castling = ()=>{
  positions.white_long_castling = false;
  positions.white_short_castling = false;
};
const no_black_castling = ()=>{
  positions.black_long_castling = false;
  positions.black_short_castling = false;
};

const clear_board = ()=>{
  positions.white_pieces={};
  positions.black_pieces={};
}

beforeEach(() => {
  positions = new Positions();
});
test('original white position has 20 movements', () => {
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(20);
});
test('check black movements after e4', () => {
  positions.white_pieces["wp5"] = new Cell(4, 4);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(20);
});
test('check white movements after e4 e5', () => {
  positions.white_pieces["wp5"] = new Cell(4, 4);
  positions.black_pieces["bp5"] = new Cell(3, 4);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(29);
});
test('check black movements after e4 e5 cf3', () => {
  positions.white_pieces["wp5"] = new Cell(4, 4);
  positions.black_pieces["bp5"] = new Cell(3, 4);
  positions.white_pieces["wn2"] = new Cell(5, 5);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(29);
});
test('check white movements after e4 e5 cf3 cc6', () => {
  positions.white_pieces["wp5"] = new Cell(4, 4);
  positions.black_pieces["bp5"] = new Cell(3, 4);
  positions.white_pieces["wn2"] = new Cell(5, 5);
  positions.black_pieces["bn1"] = new Cell(2, 2);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(27);
});
test('check black movements after e4 e5 cf3 cc6 bb5', () => {
  positions.white_pieces["wp5"] = new Cell(4, 4);
  positions.black_pieces["bp5"] = new Cell(3, 4);
  positions.white_pieces["wn2"] = new Cell(5, 5);
  positions.black_pieces["bn1"] = new Cell(2, 2);
  positions.white_pieces["wb2"] = new Cell(3, 1);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(30);
});

test('test N°1 white promotion', () => {
  clear_board();
  no_castling();
  positions.white_pieces["wp2"] = new Cell(1, 1);
  positions.white_pieces["wp4"] = new Cell(1, 3);
  positions.white_pieces["wp6"] = new Cell(1, 5);
  positions.white_pieces["wk"] = new Cell(6, 6);
  positions.black_pieces["br1"] = new Cell(0, 0);
  positions.black_pieces["br2"] = new Cell(0, 2);
  positions.black_pieces["bn1"] = new Cell(0, 4);
  positions.black_pieces["bn2"] = new Cell(0, 6);
  positions.black_pieces["bk"] = new Cell(6, 1);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(44);
});

test('test N°2 white promotion', () => {
  positions.white_pieces["wp8"] = new Cell(1, 7);
  delete positions.black_pieces["bp8"];
  delete positions.black_pieces["br2"];
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(31);
});

test('test N°1 black promotion', () => {
  positions.black_pieces["bp8"] = new Cell(6, 7);
  delete positions.white_pieces["wp8"];
  delete positions.white_pieces["wr2"];
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(31);
});

test('test N°2 black promotion', () => {
  clear_board();
  no_castling();
  positions.black_pieces["bp2"] = new Cell(6, 1);
  positions.black_pieces["bp4"] = new Cell(6, 3);
  positions.black_pieces["bp6"] = new Cell(6, 5);
  positions.black_pieces["bk"] = new Cell(1, 6);
  positions.white_pieces["wr1"] = new Cell(7, 0);
  positions.white_pieces["wr2"] = new Cell(7, 2);
  positions.white_pieces["wn1"] = new Cell(7, 4);
  positions.white_pieces["wn2"] = new Cell(7, 6);
  positions.white_pieces["wk"] = new Cell(1, 1);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(44);
});