import BoardData from './../classes/BoardData';
let boardData = {};
function foolMate(){
  boardData.selectPiece(boardData.objectCells[6][5]);
  boardData.selectPiece(boardData.objectCells[5][5]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[2][4]);
  boardData.selectPiece(boardData.objectCells[6][6]);
  boardData.selectPiece(boardData.objectCells[4][6]);
  boardData.selectPiece(boardData.objectCells[0][3]);
  boardData.selectPiece(boardData.objectCells[4][7]);
}
function scholarMate(){
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  boardData.selectPiece(boardData.objectCells[7][5]);
  boardData.selectPiece(boardData.objectCells[4][2]);
  boardData.selectPiece(boardData.objectCells[0][1]);
  boardData.selectPiece(boardData.objectCells[2][2]);
  boardData.selectPiece(boardData.objectCells[7][3]);
  boardData.selectPiece(boardData.objectCells[3][7]);
  boardData.selectPiece(boardData.objectCells[0][6]);
  boardData.selectPiece(boardData.objectCells[2][5]);
  boardData.selectPiece(boardData.objectCells[3][7]);
  boardData.selectPiece(boardData.objectCells[1][5]);
}
beforeEach(() => {
  boardData = new BoardData(true, "Game started");
});
it('with default settings shows original chess position', () => {
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,,,,*,,,,,,,*wp,wp,wp,wp,wp,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('with default settings white plays first', () => {
  expect(boardData.whitePlaying).toBe(true);
});
// game message show the status of the game, some other gameMessage values include: black wins, white wins, draw by stalemate...
it('with default settings gameMessage says "Game started"', () => {
  expect(boardData.gameMessage).toBe("Game started");
});
it('after move e4 update in the board', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,bp,bp,bp,bp*,,,,,,,*,,,,,,,*,,,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after move e4 gameMessage says "Game started"', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.gameMessage).toBe("Game started");
});
it('after move e4 black has to play', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  expect(boardData.whitePlaying).toBe(false);
});
it('after move e4 black plays e5 and board is updated', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,bq,bk,bb,bn,br*bp,bp,bp,bp,,bp,bp,bp*,,,,,,,*,,,,bp,,,*,,,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after move e4 black plays e5 gameMessage says "Game started"', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  expect(boardData.gameMessage).toBe("Game started");
});
it('after move e4 black plays e5 and white has to play', () => {
  boardData.selectPiece(boardData.objectCells[6][4]);
  boardData.selectPiece(boardData.objectCells[4][4]);
  boardData.selectPiece(boardData.objectCells[1][4]);
  boardData.selectPiece(boardData.objectCells[3][4]);
  expect(boardData.whitePlaying).toBe(true);
});
it('after fools checkmate, check valid position in the board', () => {
  foolMate();
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,,bk,bb,bn,br*bp,bp,bp,bp,,bp,bp,bp*,,,,bp,,,*,,,,,,,*,,,,,,wp,bq*,,,,,wp,,*wp,wp,wp,wp,wp,,,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after fools checkmate gameMesage is "black wins"', () => {
  foolMate();
  expect(boardData.gameMessage).toBe("black wins");
});
it('after fools checkmate, even if white tries to make a move, board stays unchanged', () => {
  foolMate();
  boardData.selectPiece(boardData.objectCells[6][0]);
  boardData.selectPiece(boardData.objectCells[4][0]);
  expect(boardData.game.give_current_board()).toBe("br,bn,bb,,bk,bb,bn,br*bp,bp,bp,bp,,bp,bp,bp*,,,,bp,,,*,,,,,,,*,,,,,,wp,bq*,,,,,wp,,*wp,wp,wp,wp,wp,,,wp*wr,wn,wb,wq,wk,wb,wn,wr");
});
it('after fools checkmate, even if white tries to make a move, gameMessage remains the same', () => {
  foolMate();
  boardData.selectPiece(boardData.objectCells[6][0]);
  boardData.selectPiece(boardData.objectCells[4][0]);
  expect(boardData.gameMessage).toBe("black wins");
});

it('after scholar checkmate, check valid position in the board', () => {
  scholarMate();
  expect(boardData.game.give_current_board()).toBe("br,,bb,bq,bk,bb,,br*bp,bp,bp,bp,,wq,bp,bp*,,bn,,,bn,,*,,,,bp,,,*,,wb,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,,wk,,wn,wr");
});
it('after scholar checkmate gameMesage is "white wins"', () => {
  scholarMate();
  expect(boardData.gameMessage).toBe("white wins");
});
it('after scholar checkmate, even if black tries to make a move, board stays unchanged', () => {
  scholarMate();
  boardData.selectPiece(boardData.objectCells[0][4]);
  boardData.selectPiece(boardData.objectCells[1][5]);
  expect(boardData.game.give_current_board()).toBe("br,,bb,bq,bk,bb,,br*bp,bp,bp,bp,,wq,bp,bp*,,bn,,,bn,,*,,,,bp,,,*,,wb,,wp,,,*,,,,,,,*wp,wp,wp,wp,,wp,wp,wp*wr,wn,wb,,wk,,wn,wr");
});
it('after scholar checkmate, even if black tries to make a move, gameMessage remains the same', () => {
  scholarMate();
  boardData.selectPiece(boardData.objectCells[0][4]);
  boardData.selectPiece(boardData.objectCells[1][5]);
  expect(boardData.gameMessage).toBe("white wins");
});