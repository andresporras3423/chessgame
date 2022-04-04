import Cell from './../classes/positions/Cell';
import Positions from './../classes/positions/Positions';
let positions = {};
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