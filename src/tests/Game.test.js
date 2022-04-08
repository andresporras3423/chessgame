import Game from './../classes/positions/Game';
import Positions from './../classes/positions/Positions';
let game = {};
beforeEach(() => {
  game = new Game();
  game.start_game();
});
it('original white position has 20 movements', () => {
  expect(game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wp,wp,wp,wp,wp,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});