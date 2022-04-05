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
test('black with no movements available', () => {
  clear_board();
  no_castling();
  positions.white_pieces["wk"] = new Cell(2, 4);
  positions.white_pieces["wp4"] = new Cell(1, 4);
  positions.black_pieces["bk"] = new Cell(0, 4);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(0);
});
test('white with no movements available', () => {
  clear_board();
  no_castling();
  positions.black_pieces["bk"] = new Cell(5, 4);
  positions.black_pieces["bp4"] = new Cell(6, 4);
  positions.white_pieces["wk"] = new Cell(7, 4);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(0);
});

test('white with no movements available N°2', () => {
  clear_board();
  no_castling();
  positions.white_pieces["wk"] = new Cell(7, 7);
  positions.white_pieces["wp1"] = new Cell(5, 0);
  positions.black_pieces["bb2"] = new Cell(7, 6);
  positions.black_pieces["bp7"] = new Cell(6, 7);
  positions.black_pieces["bp8"] = new Cell(5, 7);
  positions.black_pieces["bp1"] = new Cell(4, 0);
  positions.black_pieces["bk"] = new Cell(0, 7);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(0);
});
test('black with no movements available N°2', () => {
  clear_board();
  no_castling();
  positions.black_pieces["bk"] = new Cell(0, 7);
  positions.black_pieces["bp1"] = new Cell(4, 0);
  positions.white_pieces["wb2"] = new Cell(0, 6);
  positions.white_pieces["wp7"] = new Cell(1, 7);
  positions.white_pieces["wp8"] = new Cell(2, 7);
  positions.white_pieces["wp1"] = new Cell(5, 0);
  positions.white_pieces["wk"] = new Cell(7, 7);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(0);
});

test('white castling test 1', () => {
  clear_board();
  positions.white_pieces["wk"] = new Cell(7, 4);
  positions.white_pieces["wr1"] = new Cell(7, 0);
  positions.white_pieces["wr2"] = new Cell(7, 7);
  positions.black_pieces["bk"] = new Cell(0, 1);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(26);
});

test('white castling test 2', () => {
  delete positions.white_pieces["wn2"];
  delete positions.white_pieces["wb2"];
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(22);
});

test('white castling test 3', () => {
  delete positions.white_pieces["wn1"];
  delete positions.white_pieces["wb1"];
  delete positions.white_pieces["wq1"];
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(23);
});

test('white castling test 4', () => {
  delete positions.white_pieces["wn1"];
  delete positions.white_pieces["wb1"];
  delete positions.white_pieces["wq1"];
  delete positions.white_pieces["wn2"];
  delete positions.white_pieces["wb2"];
  delete positions.white_pieces["wp1"];
  delete positions.white_pieces["wp8"];
  delete positions.black_pieces["bp1"];
  delete positions.black_pieces["bp8"];
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(35);
});

test('white cant castling test 1', () => {
  no_white_castling();
  delete positions.white_pieces["wn1"];
  delete positions.white_pieces["wb1"];
  delete positions.white_pieces["wq1"];
  delete positions.white_pieces["wn2"];
  delete positions.white_pieces["wb2"];
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(23);
});

test('white cant castling test 2', () => {
  delete positions.white_pieces["wn2"];
  delete positions.white_pieces["wb2"];
  delete positions.white_pieces["wp6"];
  positions.black_pieces["bq1"]=new Cell(2,5);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(18);
});

test('white cant castling test 3', () => {
  delete positions.white_pieces["wn1"];
  delete positions.white_pieces["wb1"];
  delete positions.white_pieces["wq1"];
  delete positions.white_pieces["wp4"];
  positions.black_pieces["bq1"]=new Cell(2,3);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(19);
});

test('white cant castling test 4', () => {
  clear_board();
  positions.white_pieces["wr1"] = new Cell(7,0);
  positions.white_pieces["wk"] = new Cell(7,4);
  positions.white_pieces["wr2"] = new Cell(7,7);
  positions.black_pieces["bk"] = new Cell(6,1);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(25);
});

test('white cant castling test 5', () => {
  delete positions.white_pieces["wn1"];
  delete positions.white_pieces["wb1"];
  delete positions.white_pieces["wq1"];
  delete positions.white_pieces["wb2"];
  delete positions.white_pieces["wn2"];
  delete positions.white_pieces["wp4"];
  positions.black_pieces["bb1"] = new Cell(3,0);
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(4);
});

test('black castling test 1', () => {
  clear_board();
  positions.black_pieces["bk"] = new Cell(0, 4);
  positions.black_pieces["br1"] = new Cell(0, 0);
  positions.black_pieces["br2"] = new Cell(0, 7);
  positions.white_pieces["wk"] = new Cell(7, 1);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(26);
});

test('black castling test 2', () => {
  delete positions.black_pieces["bn2"];
  delete positions.black_pieces["bb2"];
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(22);
});

test('black castling test 3', () => {
  delete positions.black_pieces["bn1"];
  delete positions.black_pieces["bb1"];
  delete positions.black_pieces["bq1"];
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(23);
});

test('black castling test 4', () => {
  delete positions.black_pieces["bn1"];
  delete positions.black_pieces["bb1"];
  delete positions.black_pieces["bq1"];
  delete positions.black_pieces["bn2"];
  delete positions.black_pieces["bb2"];
  delete positions.black_pieces["bp1"];
  delete positions.black_pieces["bp8"];
  delete positions.white_pieces["wp1"];
  delete positions.white_pieces["wp8"];
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(35);
});

test('black cant castling test 1', () => {
  no_black_castling();
  delete positions.black_pieces["bn1"];
  delete positions.black_pieces["bb1"];
  delete positions.black_pieces["bq1"];
  delete positions.black_pieces["bn2"];
  delete positions.black_pieces["bb2"];
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(23);
});

test('black cant castling test 2', () => {
  delete positions.black_pieces["bn2"];
  delete positions.black_pieces["bb2"];
  delete positions.black_pieces["bp6"];
  positions.white_pieces["wq1"]=new Cell(5,5);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(18);
});

test('black cant castling test 3', () => {
  delete positions.black_pieces["bn1"];
  delete positions.black_pieces["bb1"];
  delete positions.black_pieces["bq1"];
  delete positions.black_pieces["bp4"];
  positions.white_pieces["wq1"]=new Cell(5,3);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(19);
});

test('black cant castling test 4', () => {
  clear_board();
  positions.black_pieces["br1"] = new Cell(0,0);
  positions.black_pieces["bk"] = new Cell(0,4);
  positions.black_pieces["br2"] = new Cell(0,7);
  positions.white_pieces["wk"] = new Cell(1,1);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(25);
});

test('black cant castling test 5', () => {
  delete positions.black_pieces["bn1"];
  delete positions.black_pieces["bb1"];
  delete positions.black_pieces["bq1"];
  delete positions.black_pieces["bb2"];
  delete positions.black_pieces["bn2"];
  delete positions.black_pieces["bp4"];
  positions.white_pieces["wb1"] = new Cell(4,0);
  positions.set_board();
  let set_movements = positions.available_black_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(4);
});