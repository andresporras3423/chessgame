import Game from './../classes/positions/Game';
import Positions from './../classes/positions/Positions';
let positions = {};
beforeEach(() => {
  positions = new Positions();
});
test('check if page has a start text', () => {
  positions.set_board();
  let set_movements = positions.available_white_moves();
  let movements = Array.from(set_movements);
  expect(movements.length).toBe(20);
});
