import BoardData from './../classes/BoardData';
let boardData = {};
beforeEach(() => {
  boardData = new BoardData(true, "Game started");
});
it('with default settings shows original chess position', () => {
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wp,wp,wp,wp,wp,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after move e4 update in the board', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});